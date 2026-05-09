import { useState, useRef, useEffect } from 'react';

const MMG_SYSTEM = `You are the MMG Stellar concierge — a warm, knowledgeable assistant for MMG Stellar Gym, a community fitness club.

Facility info:
- Basketball court (1)
- Pickleball / badminton courts (3 shared)
- MMA + boxing studio
- Group class studio
- Personal trainer floor + free weights

Walk-in rates: ₱200 members / ₱250 non-members per session.
Membership: ₱1,500 enrollment fee.
Monthly plans: 1 mo ₱2,200/mo · 6 mo ₱2,000/mo · 12 mo ₱1,800/mo · 24 mo ₱1,400/mo.
Hours: Mon–Sat 6am–10pm · Sun 7am–8pm.
Location: 88 Stellar Ave, Quezon City.

Keep replies short (under 80 words), friendly, and use first-person plural ("we", "our gym"). Never invent prices outside the list above.`;

const QUICK_CHIPS = ['Court availability today', "What's the membership fee?", 'Recommend a trainer', 'MMA schedule'];

type Msg = { role: 'bot' | 'user'; text: string };

async function sendMmgMessage(history: Msg[], userText: string): Promise<string> {
    const endpoint =
        (import.meta.env.VITE_AI_ENDPOINT as string | undefined) ?? 'https://openrouter.ai/api/v1/chat/completions';
    const key = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
    const model = (import.meta.env.VITE_OPENROUTER_MODEL as string | undefined) ?? 'anthropic/claude-haiku-4-5';

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (key) headers['Authorization'] = `Bearer ${key}`;

    const messages = [
        { role: 'system', content: MMG_SYSTEM },
        ...history.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
        { role: 'user', content: userText },
    ];

    const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ model, messages, max_tokens: 256 }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? 'No response received.';
}

export default function MmgChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([
        {
            role: 'bot',
            text: "Hey! I'm the MMG Stellar concierge. Ask me about court bookings, class schedules, or membership rates.",
        },
    ]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [chipsHidden, setChipsHidden] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 150);
    }, [open]);

    async function send(text: string) {
        const trimmed = text.trim();
        if (!trimmed || loading) return;
        const prev = messages;
        setChipsHidden(true);
        setValue('');
        setMessages(m => [...m, { role: 'user', text: trimmed }]);
        setLoading(true);
        try {
            const reply = await sendMmgMessage(prev, trimmed);
            setMessages(m => [...m, { role: 'bot', text: reply }]);
        } catch {
            setMessages(m => [
                ...m,
                {
                    role: 'bot',
                    text: "I'm having trouble connecting right now — try again in a moment, or call us at +63 2 8855 1212.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* FAB */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open chat"
                    className="mmg-display"
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 90,
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: '#161412',
                        color: '#f4ede0',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        letterSpacing: '2px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                    }}>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.039 2 11c0 2.638 1.17 5.014 3.063 6.729L4 22l4.5-2.25A10.8 10.8 0 0 0 12 20c5.523 0 10-4.039 10-9s-4.477-9-10-9z" />
                    </svg>
                </button>
            )}

            {/* Panel */}
            {open && (
                <div
                    role="dialog"
                    aria-label="MMG Stellar concierge"
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 90,
                        width: 380,
                        height: 560,
                        maxHeight: 'calc(100vh - 48px)',
                        background: '#f4ede0',
                        border: '1px solid #161412',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        animation: 'mmg-pop 0.18s ease',
                    }}>
                    <style>{`@keyframes mmg-pop { from { transform: scale(0.9); opacity: 0; } }`}</style>

                    {/* Header */}
                    <div
                        style={{
                            background: '#161412',
                            color: '#f4ede0',
                            padding: '16px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                        }}>
                        <div>
                            <div className="mmg-display" style={{ fontSize: 14, letterSpacing: '0.5px' }}>
                                STELLAR{' '}
                                <span className="mmg-serif" style={{ fontWeight: 400 }}>
                                    concierge
                                </span>
                            </div>
                            <div className="mmg-serif" style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
                                Ask me anything — courts, classes, rates
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#f4ede0',
                                fontSize: 18,
                                cursor: 'pointer',
                                lineHeight: 1,
                            }}>
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={bodyRef}
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: 18,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                            fontSize: 14,
                        }}
                        aria-live="polite">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: '10px 14px',
                                    maxWidth: '85%',
                                    lineHeight: 1.4,
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    background: msg.role === 'user' ? '#161412' : '#ece3d2',
                                    color: msg.role === 'user' ? '#f4ede0' : '#161412',
                                    fontFamily: 'Manrope, Helvetica, sans-serif',
                                }}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div
                                style={{
                                    alignSelf: 'flex-start',
                                    padding: '10px 14px',
                                    background: '#ece3d2',
                                    color: '#6b6259',
                                    fontStyle: 'italic',
                                    fontSize: 13,
                                    fontFamily: 'Manrope, Helvetica, sans-serif',
                                }}>
                                …
                            </div>
                        )}
                    </div>

                    {/* Quick chips */}
                    {!chipsHidden && (
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 6,
                                padding: '0 18px 12px',
                            }}>
                            {QUICK_CHIPS.map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => send(chip)}
                                    className="mmg-mono uppercase transition-colors"
                                    style={{
                                        fontSize: 10,
                                        letterSpacing: '1px',
                                        padding: '6px 10px',
                                        background: 'transparent',
                                        border: '1px solid rgba(22,20,18,0.4)',
                                        cursor: 'pointer',
                                        color: '#161412',
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}>
                                    {chip}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            send(value);
                        }}
                        style={{
                            display: 'flex',
                            borderTop: '1px solid rgba(22,20,18,0.12)',
                            flexShrink: 0,
                        }}>
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Type a message…"
                            disabled={loading}
                            style={{
                                flex: 1,
                                border: 'none',
                                padding: '14px 18px',
                                background: 'transparent',
                                fontFamily: 'Manrope, Helvetica, sans-serif',
                                fontSize: 14,
                                outline: 'none',
                                color: '#161412',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading || !value.trim()}
                            className="mmg-mono uppercase"
                            style={{
                                border: 'none',
                                background: '#161412',
                                color: '#f4ede0',
                                padding: '0 18px',
                                fontSize: 11,
                                letterSpacing: '1px',
                                cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
                                opacity: loading || !value.trim() ? 0.5 : 1,
                                fontFamily: "'JetBrains Mono', monospace",
                            }}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
