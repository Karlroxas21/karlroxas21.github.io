const PLANS = [
    {
        tag: '1 month',
        price: '2,200',
        sub: 'Month-to-month, no commitment.',
        perks: ['Full facility access', 'All group classes', 'Member rate on courts (₱200/session)'],
        popular: false,
    },
    {
        tag: '6 months',
        price: '2,000',
        sub: 'Save ₱1,200 vs monthly.',
        perks: ['Everything in Monthly', '1 free PT session', '10% off Shop apparel'],
        popular: false,
    },
    {
        tag: '12 months · most popular',
        price: '1,800',
        sub: 'Save ₱4,800 vs monthly.',
        perks: ['Everything in 6-month', '3 free PT sessions', '15% off Shop · guest passes (4)'],
        popular: true,
    },
    {
        tag: '24 months',
        price: '1,400',
        sub: 'Best value. Save ₱19,200.',
        perks: ['Everything in 12-month', '6 free PT sessions', '20% off Shop · 8 guest passes'],
        popular: false,
    },
];

export default function MmgMembership() {
    return (
        <section
            id="membership"
            className="py-16 sm:py-24"
            style={{ borderTop: '1px solid rgba(22,20,18,0.12)', background: '#ece3d2' }}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
                <div className="mmg-mono uppercase text-[#6b6259]" style={{ fontSize: 11, letterSpacing: '2px' }}>
                    03 — Membership
                </div>
                <h2
                    className="mmg-display"
                    style={{
                        fontSize: 'clamp(32px,4vw,56px)',
                        lineHeight: 1,
                        letterSpacing: '-1px',
                        margin: '8px 0 0',
                    }}>
                    Pick your <span className="mmg-serif">cadence.</span>
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.5, color: '#3d3833', marginTop: 16 }}>
                    One-time enrollment of <strong>₱1,500</strong>. Cancel anytime after your initial term.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-10 sm:mt-12">
                    {PLANS.map(plan => (
                        <PriceCard key={plan.tag} plan={plan} />
                    ))}
                </div>

                <div
                    className="mmg-mono flex flex-wrap gap-6 sm:gap-8 uppercase mt-8"
                    style={{
                        padding: '20px 24px',
                        border: '1px dashed rgba(22,20,18,0.4)',
                        fontSize: 12,
                        letterSpacing: '0.5px',
                    }}>
                    <div>
                        <strong>WALK-IN:</strong> ₱200 members · ₱250 non-members
                    </div>
                    <div>
                        <strong>HOURS:</strong> 24/7
                    </div>
                    <div>
                        <strong>LOCATION:</strong> Bagong Calzada, Taguig City
                    </div>
                </div>
            </div>
        </section>
    );
}

function PriceCard({ plan }: { plan: (typeof PLANS)[number] }) {
    return (
        <div
            className="flex flex-col gap-3.5 transition-all"
            style={{
                padding: '28px 22px',
                border: plan.popular ? '1px solid #b94e2a' : '1px solid rgba(22,20,18,0.12)',
                background: '#f4ede0',
                boxShadow: plan.popular ? '0 0 0 1px #b94e2a inset' : undefined,
            }}>
            <div
                className="mmg-mono uppercase inline-block"
                style={{
                    fontSize: 10,
                    letterSpacing: '1.5px',
                    padding: '4px 8px',
                    border: '1px solid rgba(22,20,18,0.25)',
                    background: plan.popular ? '#b94e2a' : 'transparent',
                    color: plan.popular ? '#f4ede0' : '#161412',
                    borderColor: plan.popular ? '#b94e2a' : undefined,
                }}>
                {plan.tag}
            </div>

            <div className="mmg-display" style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-2px' }}>
                <span style={{ fontSize: 28, verticalAlign: 'top', marginRight: 4 }}>₱</span>
                {plan.price}
                <span
                    style={{
                        fontFamily: 'Manrope, Helvetica, sans-serif',
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: 0,
                        color: '#6b6259',
                        marginLeft: 4,
                    }}>
                    /mo
                </span>
            </div>

            <div style={{ fontSize: 13, color: '#6b6259' }}>{plan.sub}</div>

            <ul
                style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '8px 0 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    fontSize: 14,
                }}>
                {plan.perks.map(perk => (
                    <li key={perk} style={{ paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#b94e2a' }}>→</span>
                        {perk}
                    </li>
                ))}
            </ul>

            <button
                className="transition-colors mt-auto"
                style={{
                    padding: '14px 22px',
                    border: plan.popular ? '1px solid #b94e2a' : '1px solid #161412',
                    background: plan.popular ? '#b94e2a' : 'transparent',
                    color: plan.popular ? '#f4ede0' : '#161412',
                    fontSize: 13,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    fontFamily: 'Manrope, Helvetica, sans-serif',
                    cursor: 'pointer',
                }}
                onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.background = plan.popular ? '#8a3a1f' : '#161412';
                    el.style.borderColor = plan.popular ? '#8a3a1f' : '#161412';
                    if (!plan.popular) el.style.color = '#f4ede0';
                }}
                onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.background = plan.popular ? '#b94e2a' : 'transparent';
                    el.style.borderColor = plan.popular ? '#b94e2a' : '#161412';
                    if (!plan.popular) el.style.color = '#161412';
                }}>
                Subscribe
            </button>
        </div>
    );
}
