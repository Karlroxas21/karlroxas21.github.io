import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
    const ref = useRef<HTMLDivElement>(null);
    const readoutRef = useRef<HTMLDivElement>(null);
    const [hot, setHot] = useState(false);

    useEffect(() => {
        let rx = window.innerWidth / 2;
        let ry = window.innerHeight / 2;

        let tx = rx;
        let ty = ry;

        let raf: number;

        function loop() {
            // smoothing
            rx += (tx - rx) * 0.32;
            ry += (ty - ry) * 0.32;
            if (ref.current) {
                ref.current.style.transform = `translate(${rx}px, ${ry}px)`;
            }
            if (readoutRef.current) {
                readoutRef.current.textContent = `X:${String(Math.round(tx)).padStart(4, '0')}  Y:${String(Math.round(ty)).padStart(4, '0')}`;
            }
            raf = requestAnimationFrame(loop);
        }

        function onMove(e: MouseEvent) {
            tx = e.clientX;
            ty = e.clientY;
        }

        function onOver(e: MouseEvent) {
            const el = e.target as Element | null;
            if (!el || !el.closest) return setHot(false);
            const isHot = !!el.closest('a, button, [data-hot], .proj, .repo, .post, .contact__row, .now__item');
            setHot(isHot);
        }

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver);
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
        };
    }, []);

    return (
        <div ref={ref} className={'cursor' + (hot ? ' is-hot' : '')}>
            <div className="cursor__crosshair" />
            <div className="cursor__dot" />
            <div ref={readoutRef} className="cursor__readout">
                X:0000 Y:0000
            </div>
        </div>
    );
};

export default Cursor;
