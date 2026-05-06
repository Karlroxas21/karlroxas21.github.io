import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendAIMessage, AI_PROVIDER, type Message } from '../lib/ai-chat';

const CHIPS = ['Who are you?', 'What do you build?', 'What are you working on?', 'How can I reach you?'];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [headerCloseHover, setHeaderCloseHover] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus management
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            buttonRef.current?.focus();
        }
    }, [isOpen]);

    const handleSend = async (overrideText?: string) => {
        const userText = (overrideText ?? value).trim();
        if (!userText || isLoading || !AI_PROVIDER) return;
        const history = messages;
        setValue('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);
        try {
            const aiText = await sendAIMessage(history, userText);
            setMessages(prev => [...prev, { role: 'model', text: aiText }]);
        } catch {
            setMessages(prev => [...prev, { role: 'model', text: 'Something went wrong. Try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChipClick = (chipText: string) => {
        handleSend(chipText);
    };

    return (
        <>
            {/* Floating chat button */}
            <button
                ref={buttonRef}
                className="fixed bottom-15 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-opacity hover:opacity-90"
                style={{ background: 'var(--color-fg)', color: 'var(--color-bg)' }}
                onClick={() => setIsOpen(o => !o)}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}>
                {isOpen ? (
                    // × close icon
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    // Chat bubble icon
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.039 2 11c0 2.638 1.17 5.014 3.063 6.729L4 22l4.5-2.25A10.8 10.8 0 0 0 12 20c5.523 0 10-4.039 10-9s-4.477-9-10-9z" />
                    </svg>
                )}
            </button>

            {/* Chat panel — always in DOM, visibility via opacity + transform + pointer-events */}
            <div
                role="dialog"
                aria-label="Chat with Karl's AI assistant"
                aria-modal="true"
                className="fixed bottom-15 right-23 z-40 w-[380px] h-[560px] rounded-lg flex flex-col"
                style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-hairline)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'transform 220ms ease-out, opacity 220ms ease-out',
                }}>
                {/* Panel header */}
                <div
                    className="flex items-center justify-between px-4 h-12 shrink-0"
                    style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                    <span
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 16,
                            fontStyle: 'italic',
                            color: 'var(--color-fg)',
                        }}>
                        Ask Karl
                    </span>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat panel"
                        onMouseEnter={() => setHeaderCloseHover(true)}
                        onMouseLeave={() => setHeaderCloseHover(false)}
                        style={{
                            color: headerCloseHover ? 'var(--color-fg)' : 'var(--color-fg-3)',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 4,
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'color 150ms ease',
                        }}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" aria-live="polite">
                    {/* Chips — shown only before first message */}
                    {messages.length === 0 && !isLoading && (
                        <div className="flex flex-wrap gap-2 justify-center mt-auto pt-4">
                            {CHIPS.map(chip => (
                                <button
                                    key={chip}
                                    onClick={() => handleChipClick(chip)}
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 11,
                                        letterSpacing: '0.10em',
                                        padding: '8px 16px',
                                        borderRadius: 999,
                                        border: '1px solid var(--color-hairline)',
                                        background: 'var(--color-bg)',
                                        color: 'var(--color-fg)',
                                        cursor: 'pointer',
                                    }}>
                                    {chip}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Message bubbles */}
                    {messages.map((msg, i) =>
                        msg.role === 'model' ? (
                            // AI bubble
                            <div
                                key={i}
                                style={{
                                    alignSelf: 'flex-start',
                                    maxWidth: '85%',
                                    background: 'var(--color-bg)',
                                    border: '1px solid var(--color-hairline)',
                                    borderRadius: '8px 8px 8px 2px',
                                    padding: '8px 16px',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 15,
                                    lineHeight: 1.5,
                                    color: 'var(--color-fg)',
                                }}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                            </div>
                        ) : (
                            // User bubble
                            <div
                                key={i}
                                style={{
                                    alignSelf: 'flex-end',
                                    maxWidth: '85%',
                                    background: 'var(--color-fg)',
                                    borderRadius: '8px 8px 2px 8px',
                                    padding: '8px 16px',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: 15,
                                    lineHeight: 1.5,
                                    color: 'var(--color-bg)',
                                }}>
                                {msg.text}
                            </div>
                        )
                    )}

                    {/* Loading dot bubble */}
                    {isLoading && (
                        <div
                            style={{
                                alignSelf: 'flex-start',
                                border: '1px solid var(--color-hairline)',
                                borderRadius: '8px 8px 8px 2px',
                                padding: '8px 16px',
                                display: 'flex',
                                gap: 4,
                                alignItems: 'center',
                            }}>
                            {[0, 150, 300].map(delay => (
                                <span
                                    key={delay}
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        background: 'var(--color-fg-3)',
                                        display: 'inline-block',
                                        animation: `chatDotPulse 800ms ${delay}ms ease-in-out infinite`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Auto-scroll anchor */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Panel footer — input row */}
                <div
                    className="shrink-0 flex items-center gap-2 px-4 h-14"
                    style={{
                        borderTop: '1px solid var(--color-hairline)',
                        opacity: isLoading ? 0.6 : 1,
                    }}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') handleSend();
                        }}
                        disabled={isLoading}
                        placeholder="Ask me anything about Karl…"
                        aria-label="Type your question"
                        className="flex-1 bg-transparent outline-none text-[15px]"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-fg)' }}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!value.trim() || isLoading}
                        aria-label="Send message"
                        style={{
                            background: value.trim() && !isLoading ? 'var(--color-fg)' : 'var(--color-hairline)',
                            color: 'var(--color-bg)',
                            opacity: !value.trim() || isLoading ? 0.5 : 1,
                            cursor: !value.trim() || isLoading ? 'not-allowed' : 'pointer',
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: 'none',
                        }}>
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatBot;
