import '../components/mmg/mmg.css';
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
        <div className="mmg-page">
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
