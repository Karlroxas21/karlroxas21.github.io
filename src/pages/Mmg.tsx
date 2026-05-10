import MmgNav from '../components/mmg/MmgNav';
import MmgHero from '../components/mmg/MmgHero';
import MmgFeatures from '../components/mmg/MmgFeatures';
import MmgSchedule from '../components/mmg/MmgSchedule';
import MmgMembership from '../components/mmg/MmgMembership';
import MmgCommunity from '../components/mmg/MmgCommunity';
import MmgLocation from '../components/mmg/MmgLocation';
import MmgShop from '../components/mmg/MmgShop';
import MmgFooter from '../components/mmg/MmgFooter';
import MmgChatbot from '../components/mmg/MmgChatbot';

export default function Mmg() {
    return (
        <div
            style={{
                background: '#f4ede0',
                color: '#161412',
                fontFamily: "'Manrope', Helvetica, sans-serif",
                WebkitFontSmoothing: 'antialiased',
                fontSize: '15px',
                lineHeight: '1.5',
            }}>
            <MmgNav />
            <MmgHero />
            <MmgFeatures />
            <MmgSchedule />
            <MmgMembership />
            <MmgCommunity />
            <MmgLocation />
            <MmgShop />
            <MmgFooter />
            <MmgChatbot />
        </div>
    );
}
