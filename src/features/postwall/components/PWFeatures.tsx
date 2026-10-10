import { Reveal, SectionHead } from './PWPrimitives';
import { PW } from '../pwTokens';

/** One feature as a numbered row: index, title, one plain sentence. No icon tile, no card. */
function FeatureRow({ index, title, body, delay }: { index: number; title: string; body: string; delay: number }) {
    return (
        <Reveal as="li" delay={delay}>
            <div
                className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 py-6"
                style={{ borderTop: '0.5px solid ' + PW.hairlineStrong }}>
                <span style={{ fontFamily: PW.mono, fontSize: 12, color: PW.inkFaint, paddingTop: 4 }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                    <h3 className="m-0 mb-1.5" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>
                        {title}
                    </h3>
                    <p className="m-0" style={{ fontSize: 16, lineHeight: 1.6, color: PW.inkSoft, maxWidth: '46ch' }}>
                        {body}
                    </p>
                </div>
            </div>
        </Reveal>
    );
}

/** Only what the shipped app does. Each line is checkable against postwall-ui. */
const FEATURES: { title: string; body: string }[] = [
    {
        title: 'Always on top',
        body: 'Pin any note and it floats above every other window. Unpin it and it behaves like a normal window again.',
    },
    {
        title: 'Search everything',
        body: 'Ctrl / ⌘ K searches every note’s title, text and tags. Start typing and the list narrows as you go.',
    },
    {
        title: 'Tags, not folders',
        body: 'Up to three tags on a note instead of a folder tree. Click one to filter the wall down to it.',
    },
    {
        title: 'Today, Pinned, Archived',
        body: 'The wall sorts itself into what you touched today, what you pinned, and what you have finished with.',
    },
    {
        title: 'Your own cloud',
        body: 'Free sync through a folder iCloud, Dropbox or Syncthing already syncs. No account, nothing hosted by us.',
    },
    {
        title: 'Version history (Pro)',
        body: 'Pro keeps 30 days of every note’s earlier versions. Open an earlier one and restore it in a click.',
    },
];

export default function PWFeatures() {
    return (
        <section
            id="pw-features"
            className="py-[110px] md:py-[140px]"
            style={{
                background: PW.sidebar,
                borderTop: '0.5px solid ' + PW.hairline,
                borderBottom: '0.5px solid ' + PW.hairline,
                scrollMarginTop: 64,
            }}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-8">
                <SectionHead
                    eyebrow="Power, quietly"
                    title="Everything you need. Nothing you don't."
                    kicker="The features that matter to a daily user, and nothing that gets in the way."
                />
                <ol
                    className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-x-14"
                    style={{ borderBottom: '0.5px solid ' + PW.hairlineStrong }}>
                    {FEATURES.map((f, i) => (
                        <FeatureRow key={f.title} index={i} title={f.title} body={f.body} delay={(i % 2) * 70} />
                    ))}
                </ol>
            </div>
        </section>
    );
}
