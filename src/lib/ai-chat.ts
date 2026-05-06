import { SYSTEM_PROMPT } from '../constants/chatbot-context';

export type Message = { role: 'user' | 'model'; text: string };

type Provider = 'gemini' | 'anthropic';

const PROVIDER_ENV = import.meta.env.VITE_AI_PROVIDER as string | undefined;
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

function resolveProvider(): Provider | null {
    if (PROVIDER_ENV === 'anthropic') return ANTHROPIC_KEY ? 'anthropic' : null;
    if (PROVIDER_ENV === 'gemini') return GEMINI_KEY ? 'gemini' : null;
    // auto-detect: Anthropic first, then Gemini
    if (ANTHROPIC_KEY) return 'anthropic';
    if (GEMINI_KEY) return 'gemini';
    return null;
}

export const AI_PROVIDER: Provider | null = resolveProvider();

export async function sendAIMessage(history: Message[], userText: string): Promise<string> {
    if (!AI_PROVIDER) throw new Error('No AI provider configured');
    return AI_PROVIDER === 'anthropic' ? sendAnthropic(history, userText) : sendGemini(history, userText);
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

async function sendAnthropic(history: Message[], userText: string): Promise<string> {
    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const client = new Anthropic({ apiKey: ANTHROPIC_KEY!, dangerouslyAllowBrowser: true });

    const messages = [
        ...history.map(m => ({
            role: (m.role === 'model' ? 'assistant' : 'user') as 'assistant' | 'user',
            content: m.text,
        })),
        { role: 'user' as const, content: userText },
    ];

    const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
    });

    const block = response.content[0];
    return block.type === 'text' ? block.text : 'No response received.';
}
