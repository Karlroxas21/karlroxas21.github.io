import { SYSTEM_PROMPT } from '../constants/chatbot-context';

export type Message = { role: 'user' | 'model'; text: string };

type Provider = 'gemini' | 'openrouter';

const PROVIDER_ENV = import.meta.env.VITE_AI_PROVIDER as string | undefined;
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
const OPENROUTER_MODEL = (import.meta.env.VITE_OPENROUTER_MODEL as string | undefined) ?? 'anthropic/claude-haiku-4-5';
const OPENROUTER_ENDPOINT = import.meta.env.DEV
    ? 'https://openrouter.ai/api/v1/chat/completions'
    : ((import.meta.env.VITE_AI_ENDPOINT as string | undefined) ?? 'https://openrouter.ai/api/v1/chat/completions');

function resolveProvider(): Provider | null {
    const hasProxy = !import.meta.env.DEV && !!import.meta.env.VITE_AI_ENDPOINT;
    if (PROVIDER_ENV === 'openrouter') return OPENROUTER_KEY || hasProxy ? 'openrouter' : null;
    if (PROVIDER_ENV === 'gemini') return GEMINI_KEY ? 'gemini' : null;
    // auto-detect: OpenRouter first, then Gemini
    if (OPENROUTER_KEY || hasProxy) return 'openrouter';
    if (GEMINI_KEY) return 'gemini';
    return null;
}

export const AI_PROVIDER: Provider | null = resolveProvider();

export async function sendAIMessage(history: Message[], userText: string): Promise<string> {
    if (!AI_PROVIDER) throw new Error('No AI provider configured');
    return AI_PROVIDER === 'openrouter' ? sendOpenRouter(history, userText) : sendGemini(history, userText);
}

async function sendOpenRouter(history: Message[], userText: string): Promise<string> {
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history.map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.text,
        })),
        { role: 'user', content: userText },
    ];

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (import.meta.env.DEV && OPENROUTER_KEY) headers['Authorization'] = `Bearer ${OPENROUTER_KEY}`;

    const response = await fetch(OPENROUTER_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({ model: OPENROUTER_MODEL, messages, max_tokens: 512 }),
    });

    if (!response.ok) throw new Error(`OpenRouter ${response.status}`);

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? 'No response received.';
}

async function sendGemini(history: Message[], userText: string): Promise<string> {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: GEMINI_KEY! });

    const contents = [
        ...history.map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }],
        })),
        { role: 'user', parts: [{ text: userText }] },
    ];

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents,
        config: { systemInstruction: SYSTEM_PROMPT },
    });

    return response.text ?? 'No response received.';
}
