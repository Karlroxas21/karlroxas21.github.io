import { IconWallet, IconUsers, IconShieldCheck, IconQrCode, IconArrowDown } from './RDIcons';

const fontMono = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace';
const fontSans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function StatusBar() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 22px 4px',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: fontSans,
            }}>
            <span>9:41</span>
            <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                    <path d="M1 9h2V6H1v3zm4 0h2V4H5v5zm4 0h2V2H9v7zm4 0h-2V0h2v9z" />
                </svg>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M1 5a6 6 0 0 1 12 0M3 6.5a4 4 0 0 1 8 0M5 8a2 2 0 0 1 4 0" />
                </svg>
                <span
                    style={{
                        width: 16,
                        height: 8,
                        border: '1px solid rgba(255,255,255,.65)',
                        borderRadius: 2,
                        position: 'relative',
                        display: 'inline-block',
                    }}>
                    <span
                        style={{
                            position: 'absolute',
                            top: 1,
                            left: 1,
                            right: 6,
                            bottom: 1,
                            background: '#fff',
                            borderRadius: 1,
                        }}
                    />
                </span>
            </span>
        </div>
    );
}

function TabBar({ active = 'home', light = false }: { active?: string; light?: boolean }) {
    const tabs = [
        { id: 'home', label: 'Fund', icon: <IconWallet size={18} strokeWidth={1.6} /> },
        { id: 'groups', label: 'Groups', icon: <IconUsers size={18} strokeWidth={1.6} /> },
        { id: 'activity', label: 'Activity', icon: <IconArrowDown size={18} strokeWidth={1.6} /> },
        { id: 'profile', label: 'You', icon: <IconShieldCheck size={18} strokeWidth={1.6} /> },
    ];
    const bg = light ? '#fff' : '#0A0A0A';
    const border = light ? '#E5E5E5' : 'rgba(255,255,255,.06)';
    const activeFg = light ? '#0A0A0A' : '#fff';
    const inactiveFg = light ? '#B0B0B0' : '#606060';
    return (
        <div
            style={{
                marginTop: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                padding: '10px 8px 18px',
                borderTop: `1px solid ${border}`,
                background: bg,
            }}>
            {tabs.map(t => (
                <div
                    key={t.id}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 9,
                        color: active === t.id ? activeFg : inactiveFg,
                        padding: '6px 0',
                    }}>
                    {t.icon}
                    <span>{t.label}</span>
                </div>
            ))}
        </div>
    );
}

export function DashboardMock({ light = false }: { light?: boolean }) {
    const bg = light ? '#fff' : '#0A0A0A';
    const fg = light ? '#0A0A0A' : '#fff';
    const cardBg = light
        ? 'linear-gradient(135deg,#FAFAFA,#F0F0F0)'
        : 'linear-gradient(135deg,#161616 0%,#1F1F1F 100%)';
    const cardBorder = light ? '#E5E5E5' : 'rgba(255,255,255,.06)';
    const barBg = light ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.08)';
    const barFill = light ? '#0A0A0A' : '#fff';
    const avatarBg = light ? 'linear-gradient(135deg,#EEE,#DDD)' : 'linear-gradient(135deg,#2a2a2a,#444)';
    const avatarBorder = light ? '#E5E5E5' : 'rgba(255,255,255,.08)';
    const entryBg = light ? '#F5F5F5' : 'rgba(255,255,255,.05)';
    const entryBorder = light ? '#E5E5E5' : 'rgba(255,255,255,.06)';

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: bg,
                color: fg,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: fontSans,
            }}>
            <StatusBar />
            <div
                style={{
                    padding: '16px 22px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <div>
                    <div style={{ fontSize: 11, color: '#B0B0B0' }}>Good morning</div>
                    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Rainy fund</div>
                </div>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: avatarBg,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        border: `1px solid ${avatarBorder}`,
                    }}>
                    JS
                </div>
            </div>

            <div
                style={{
                    margin: '12px 18px 0',
                    padding: 20,
                    borderRadius: 20,
                    background: cardBg,
                    border: `1px solid ${cardBorder}`,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                <div
                    style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: '#808080',
                        textTransform: 'uppercase',
                    }}>
                    Current balance
                </div>
                <div
                    style={{
                        marginTop: 8,
                        fontFamily: fontMono,
                        fontSize: 32,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                    }}>
                    ₱8,420<small style={{ fontSize: 16, color: '#808080', fontWeight: 500 }}>.50</small>
                </div>
                <div style={{ marginTop: 4, fontSize: 11, color: '#B0B0B0' }}>
                    Goal ₱12,500 · <b style={{ color: '#34D399', fontWeight: 600 }}>+₱340 this month</b>
                </div>
                <div style={{ marginTop: 14, height: 6, borderRadius: 999, background: barBg, overflow: 'hidden' }}>
                    <div className="rd-fund-bar-fill" style={{ background: barFill }} />
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '22px 22px 10px',
                }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Recent</span>
                <span style={{ fontSize: 11, color: '#808080' }}>See all</span>
            </div>

            {[
                { t: 'Monthly deposit', d: 'Apr 24 · Auto', a: '+₱200.00', pos: true },
                { t: 'Vet visit', d: 'Apr 19 · Withdrawal', a: '−₱84.20', pos: false },
                { t: 'Side gig', d: 'Apr 14 · Deposit', a: '+₱120.00', pos: true },
                { t: 'Monthly deposit', d: 'Mar 24 · Auto', a: '+₱200.00', pos: true },
            ].map((r, i) => (
                <div
                    key={i}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '32px 1fr auto',
                        gap: 12,
                        alignItems: 'center',
                        padding: '8px 22px',
                    }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 10,
                            background: entryBg,
                            display: 'grid',
                            placeItems: 'center',
                            border: `1px solid ${entryBorder}`,
                        }}>
                        {r.pos ? (
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4">
                                <polyline points="6 12 18 12" />
                                <polyline points="12 6 12 18" />
                            </svg>
                        ) : (
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4">
                                <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 500 }}>{r.t}</div>
                        <div style={{ fontSize: 10, color: '#808080', marginTop: 2 }}>{r.d}</div>
                    </div>
                    <span
                        style={{
                            fontFamily: fontMono,
                            fontSize: 13,
                            fontWeight: 600,
                            color: r.pos ? '#34D399' : '#F87171',
                        }}>
                        {r.a}
                    </span>
                </div>
            ))}

            <TabBar active="home" light={light} />
        </div>
    );
}

export function GroupMock() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#0A0A0A',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: fontSans,
            }}>
            <StatusBar />
            <div
                style={{
                    padding: '16px 22px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <div>
                    <div style={{ fontSize: 11, color: '#B0B0B0' }}>Group · 4 members</div>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>Roadtrip 2026</div>
                </div>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#2a2a2a,#444)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        border: '1px solid rgba(255,255,255,.08)',
                    }}>
                    RT
                </div>
            </div>

            <div
                style={{
                    margin: '12px 18px 0',
                    padding: 20,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg,#161616 0%,#1F1F1F 100%)',
                    border: '1px solid rgba(255,255,255,.06)',
                }}>
                <div
                    style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: '#808080',
                        textTransform: 'uppercase',
                    }}>
                    Pooled total
                </div>
                <div style={{ marginTop: 8, fontFamily: fontMono, fontSize: 32, fontWeight: 700 }}>
                    ₱3,210<small style={{ fontSize: 16, color: '#808080', fontWeight: 500 }}>.00</small>
                </div>
                <div style={{ marginTop: 4, fontSize: 11, color: '#B0B0B0' }}>
                    Goal ₱5,000 · <b style={{ color: '#34D399' }}>64% there</b>
                </div>
                <div
                    style={{
                        marginTop: 14,
                        height: 6,
                        borderRadius: 999,
                        background: 'rgba(255,255,255,.08)',
                        overflow: 'hidden',
                    }}>
                    <div style={{ height: '100%', width: '64%', background: '#fff', borderRadius: 999 }} />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '22px 22px 10px' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Members</span>
                <span style={{ fontSize: 11, color: '#808080' }}>Rank</span>
            </div>

            {[
                { r: '01', n: 'Jamie S.', a: '₱1,120.00', first: true },
                { r: '02', n: 'Alex P.', a: '₱880.00', first: false },
                { r: '03', n: 'Morgan L.', a: '₱720.00', first: false },
                { r: '04', n: 'Riley K.', a: '₱490.00', first: false },
            ].map(m => (
                <div
                    key={m.r}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr auto',
                        gap: 12,
                        alignItems: 'center',
                        padding: '12px 22px',
                        borderBottom: '1px solid rgba(255,255,255,.05)',
                    }}>
                    <span style={{ fontFamily: fontMono, fontSize: 12, color: m.first ? '#34D399' : '#606060' }}>
                        {m.r}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{m.n}</span>
                    <span style={{ fontFamily: fontMono, fontSize: 12, color: '#B0B0B0' }}>{m.a}</span>
                </div>
            ))}

            <TabBar active="groups" />
        </div>
    );
}

export function ActivityMock() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#0A0A0A',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: fontSans,
            }}>
            <StatusBar />
            <div
                style={{
                    padding: '16px 22px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <div>
                    <div style={{ fontSize: 11, color: '#B0B0B0' }}>Verified · 412 entries</div>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>Activity</div>
                </div>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#2a2a2a,#444)',
                        display: 'grid',
                        placeItems: 'center',
                        border: '1px solid rgba(255,255,255,.08)',
                    }}>
                    <IconShieldCheck size={16} strokeWidth={2} />
                </div>
            </div>

            <div style={{ padding: '0 22px' }}>
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 500,
                        background: 'rgba(52,211,153,.12)',
                        color: '#34D399',
                        border: '1px solid rgba(52,211,153,.25)',
                    }}>
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#34D399',
                            boxShadow: '0 0 0 3px rgba(52,211,153,.18)',
                            display: 'inline-block',
                        }}
                    />
                    Hash chain intact
                </span>
            </div>

            {[
                { t: 'Deposit · Personal', d: 'Apr 24, 10:14', a: '+₱200.00', k: 'pos' },
                { t: 'Withdraw · Personal', d: 'Apr 19, 16:02', a: '−₱84.20', k: 'neg' },
                { t: 'Group join · Roadtrip', d: 'Apr 18, 09:33', a: '—', k: '' },
                { t: 'Deposit · Roadtrip', d: 'Apr 17, 21:08', a: '+₱50.00', k: 'pos' },
                { t: 'Sync · QR exchange', d: 'Apr 16, 12:47', a: '—', k: '' },
                { t: 'Deposit · Personal', d: 'Apr 14, 18:22', a: '+₱120.00', k: 'pos' },
            ].map((r, i) => (
                <div
                    key={i}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr auto',
                        gap: 12,
                        alignItems: 'center',
                        padding: '12px 22px',
                    }}>
                    <span style={{ marginLeft: 10 }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: r.k === 'pos' ? '#34D399' : r.k === 'neg' ? '#F87171' : '#fff',
                                opacity: r.k ? 1 : 0.4,
                            }}
                        />
                    </span>
                    <span>
                        <div style={{ fontSize: 12 }}>{r.t}</div>
                        <div style={{ fontSize: 10, color: '#808080' }}>{r.d}</div>
                    </span>
                    <span
                        style={{
                            fontFamily: fontMono,
                            fontSize: 12,
                            color: r.k === 'pos' ? '#34D399' : r.k === 'neg' ? '#F87171' : '#B0B0B0',
                        }}>
                        {r.a}
                    </span>
                </div>
            ))}

            <TabBar active="activity" />
        </div>
    );
}

export function QRMock() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#0A0A0A',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: fontSans,
            }}>
            <StatusBar />
            <div
                style={{
                    padding: '16px 22px 8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <div>
                    <div style={{ fontSize: 11, color: '#B0B0B0' }}>Group invite</div>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>Show this code</div>
                </div>
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#2a2a2a,#444)',
                        display: 'grid',
                        placeItems: 'center',
                        border: '1px solid rgba(255,255,255,.08)',
                    }}>
                    <IconQrCode size={16} strokeWidth={2} />
                </div>
            </div>

            <div
                style={{
                    margin: '24px 22px',
                    padding: 22,
                    borderRadius: 20,
                    background: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    aspectRatio: '1/1',
                }}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                        background: `
                        radial-gradient(circle at 12% 12%, #000 0 18%, transparent 19%) 0 0/100% 100%,
                        radial-gradient(circle at 88% 12%, #000 0 18%, transparent 19%) 0 0/100% 100%,
                        radial-gradient(circle at 12% 88%, #000 0 18%, transparent 19%) 0 0/100% 100%,
                        repeating-conic-gradient(from 0deg at 50% 50%, #000 0 8deg, #fff 0 16deg),
                        #fff
                    `,
                        backgroundBlendMode: 'normal, normal, normal, multiply',
                    }}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background:
                                'repeating-linear-gradient(0deg, #000 0 6%, transparent 6% 12%), repeating-linear-gradient(90deg, #000 0 6%, transparent 6% 12%)',
                            backgroundBlendMode: 'multiply',
                            mixBlendMode: 'multiply',
                            borderRadius: 8,
                        }}
                    />
                </div>
            </div>

            <div style={{ padding: '0 22px', textAlign: 'center', color: '#B0B0B0', fontSize: 12 }}>
                Have a friend scan this to join.
                <br />
                No internet required.
            </div>

            <TabBar active="groups" />
        </div>
    );
}
