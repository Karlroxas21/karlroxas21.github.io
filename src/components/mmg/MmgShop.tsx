const ITEMS = [
    { name: 'Stellar Tee', price: '₱890', caption: 'Stellar tee · sand', src: '/images/mmg/shop-tee.svg' },
    { name: 'Stellar Shorts', price: '₱1,250', caption: 'Boxing shorts · oxblood', src: '/images/mmg/shop-shorts.svg' },
    { name: 'Stellar Hoodie', price: '₱2,400', caption: 'Hoodie · charcoal', src: '/images/mmg/shop-hoodie.svg' },
    { name: 'Stellar Tote', price: '₱650', caption: 'Tote · canvas', src: '/images/mmg/shop-tote.svg' },
];

export default function MmgShop() {
    return (
        <section
            id="shop"
            className="py-16 sm:py-24"
            style={{
                borderTop: '1px solid rgba(22,20,18,0.12)',
                background: '#161412',
                color: '#f4ede0',
            }}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
                <div className="flex justify-between items-end flex-wrap gap-4 mb-10 sm:mb-12">
                    <div>
                        <div
                            className="mmg-mono uppercase"
                            style={{ fontSize: 11, letterSpacing: '2px', color: '#bbb' }}>
                            06 — Shop
                        </div>
                        <h2
                            className="mmg-display"
                            style={{
                                fontSize: 'clamp(32px,4vw,56px)',
                                lineHeight: 1,
                                letterSpacing: '-1px',
                                margin: '8px 0 0',
                            }}>
                            Wear the <span className="mmg-serif">stellar.</span>
                        </h2>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center no-underline transition-colors"
                        style={{
                            padding: '14px 22px',
                            border: '1px solid #f4ede0',
                            color: '#f4ede0',
                            fontSize: 13,
                            letterSpacing: '0.8px',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            fontFamily: 'Manrope, Helvetica, sans-serif',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = '#f4ede0';
                            (e.currentTarget as HTMLElement).style.color = '#161412';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = '#f4ede0';
                        }}>
                        All apparel →
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ITEMS.map(item => (
                        <div
                            key={item.name}
                            style={{
                                border: '1px solid rgba(244,237,224,0.13)',
                                background: 'rgba(255,255,255,0.05)',
                            }}>
                            <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                                <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div
                                className="flex justify-between flex-wrap gap-1"
                                style={{ padding: '12px 14px', fontSize: 13 }}>
                                <span>{item.name}</span>
                                <span>{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
