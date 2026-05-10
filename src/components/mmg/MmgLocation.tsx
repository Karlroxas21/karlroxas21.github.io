export default function MmgLocation() {
    return (
        <section id="location" className="py-16 sm:py-24" style={{ borderTop: '1px solid rgba(22,20,18,0.12)' }}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
                <div className="mmg-mono uppercase text-[#6b6259]" style={{ fontSize: 11, letterSpacing: '2px' }}>
                    05 — Find Us
                </div>
                <h2
                    className="mmg-display"
                    style={{
                        fontSize: 'clamp(32px,4vw,56px)',
                        lineHeight: 1,
                        letterSpacing: '-1px',
                        margin: '8px 0 40px',
                    }}>
                    Come <span className="mmg-serif">train.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-12 items-center">
                    <div className="flex flex-col gap-8">
                        <div>
                            <div
                                className="mmg-mono uppercase"
                                style={{ fontSize: 11, letterSpacing: '2px', color: '#6b6259', marginBottom: 8 }}>
                                Address
                            </div>
                            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
                                Bagong Calzada
                                <br />
                                Taguig City, Metro Manila
                                <br />
                                Philippines
                            </p>
                        </div>

                        <div>
                            <div
                                className="mmg-mono uppercase"
                                style={{ fontSize: 11, letterSpacing: '2px', color: '#6b6259', marginBottom: 8 }}>
                                Contact
                            </div>
                            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
                                +63 923 970 3709
                                <br />
                                karlm.roxas@gmail.com
                            </p>
                        </div>

                        <div>
                            <div
                                className="mmg-mono uppercase"
                                style={{ fontSize: 11, letterSpacing: '2px', color: '#6b6259', marginBottom: 8 }}>
                                Hours
                            </div>
                            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>Open 24 / 7</p>
                        </div>
                    </div>

                    <div
                        style={{
                            border: '1px solid rgba(22,20,18,0.12)',
                            overflow: 'hidden',
                            aspectRatio: '16/9',
                        }}>
                        <iframe
                            title="MMG Stellar location"
                            src="https://maps.google.com/maps?q=14.5305658,121.0720775&z=18&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block' }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
