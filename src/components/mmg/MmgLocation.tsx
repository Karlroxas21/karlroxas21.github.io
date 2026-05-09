export default function MmgLocation() {
    return (
        <section id="location" style={{ padding: '96px 0', borderTop: '1px solid rgba(22,20,18,0.12)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                <div className="mmg-mono uppercase text-[#6b6259]" style={{ fontSize: 11, letterSpacing: '2px' }}>
                    05 — Find Us
                </div>
                <h2
                    className="mmg-display"
                    style={{
                        fontSize: 'clamp(32px,4vw,56px)',
                        lineHeight: 1,
                        letterSpacing: '-1px',
                        margin: '8px 0 48px',
                    }}>
                    Come <span className="mmg-serif">train.</span>
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        gap: 48,
                        alignItems: 'center',
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
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
