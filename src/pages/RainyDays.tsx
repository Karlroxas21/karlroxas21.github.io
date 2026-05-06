import { useEffect } from 'react';

import RDNav from '../components/rainydays/RDNav';
import RDHero from '../components/rainydays/RDHero';
import RDStats from '../components/rainydays/RDStats';
import RDScenarios from '../components/rainydays/RDScenarios';
import RDFeatures from '../components/rainydays/RDFeatures';
import RDHowItWorks from '../components/rainydays/RDHowItWorks';
import RDWhyExists from '../components/rainydays/RDWhyExists';
import RDPrivacyCallout from '../components/rainydays/RDPrivacyCallout';
import RDScreens from '../components/rainydays/RDScreens';
import RDDownload from '../components/rainydays/RDDownload';
import RDFooter from '../components/rainydays/RDFooter';

function useReveal() {
    useEffect(() => {
        const targets = document.querySelectorAll<HTMLElement>('.rd-reveal');
        const io = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-visible');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        targets.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
}

function useCountUp() {
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targets = document.querySelectorAll<HTMLElement>('[data-countup]');

        if (reduce) {
            targets.forEach(el => {
                el.textContent = el.dataset.countup ?? '';
            });
            return;
        }

        const fmt = (n: number) => '₱' + Math.round(n).toLocaleString('en-PH');

        const animate = (el: HTMLElement) => {
            const finalStr = el.dataset.countup ?? '';
            const finalNum = parseInt(finalStr.replace(/[^\d]/g, ''), 10);
            const dur = 900;
            const start = performance.now();
            const tick = (t: number) => {
                const p = Math.min(1, (t - start) / dur);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = fmt(finalNum * eased);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = finalStr;
            };
            requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        animate(e.target as HTMLElement);
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        targets.forEach(el => {
            el.textContent = '₱0';
            io.observe(el);
        });

        return () => io.disconnect();
    }, []);
}

export default function RainyDays() {
    useReveal();
    useCountUp();

    return (
        <div className="rd-page">
            <RDNav />
            <RDHero />
            <RDStats />
            <RDScenarios />
            <RDFeatures />
            <RDHowItWorks />
            <RDWhyExists />
            <RDPrivacyCallout />
            <RDScreens />
            <RDDownload />
            <RDFooter />
        </div>
    );
}
