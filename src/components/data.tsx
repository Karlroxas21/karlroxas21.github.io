import type { Profile, Link, About, Project, Post, Experience, Now, Repository } from './types';

export const PROFILE: Profile = {
    name: 'Karl Marx Roxas',
    role: 'Software Engineer',
    location: 'Taguig, PH',
    timezone: 'UTC+08:00',
    status: 'Open to mid-level roles — anytime',
    initials: 'KMR',
    tagline: (
        <>
            I build <em>calm, durable</em> systems
            <br />
            for the messy parts of the web.
        </>
    ),
    sub: 'Software engineer, two years in. Currently focused on performance, web and mobile, agentic development and full-stack product work that ships.',
    email: 'karlm.roxas@gmail.com',
};

export const LINKS: Link[] = [
    { k: 'github', v: 'github.com/karlroxas', href: 'https://github.com/Karlroxas21' },
    { k: 'linkedin', v: 'linkedin.com/in/km-roxas', href: 'https://www.linkedin.com/in/km-roxas/' },
    { k: 'writing', v: '/notes', href: '#writing' },
    { k: 'resume', v: 'resume.pdf', href: 'files/resume.pdf' },
    { k: 'email', v: 'karlm.roxas@gmail.com', href: 'mailto:karlm.roxas@gmail.com' },
];

export const ABOUT: About = {
    lede: (
        <>
            I've spent two years <em>writing, shipping, and deleting</em> software — from a one-person web app to
            production touching hundreds of requests a day. I care about the work, not the stack.
        </>
    ),
    cols: [
        "I'm Karl, a software engineer who enjoys building useful, purposeful websites that actually work well.",
        "These days I work mostly in TypeScript, Java, React, and React Native, with detours into infra. Off-hours, you'll find me at the gym and outside running, cycling or hiking.",
    ],
    stats: [
        { k: 'based', v: 'Taguig, PH' },
        { k: 'since', v: '2024' },
        { k: 'stack', v: 'TS · Java · React' },
        { k: 'available', v: 'Any time' },
    ],
};

export const PROJECTS: Project[] = [
    {
        n: '01',
        title: 'RainyDays',
        desc: 'An offline-first mobile savings tracker built with React Native and Expo. Track personal savings, manage group funds, and sync groups peer-to-peer via QR codes — all data stays on your device.',
        tags: ['Cross-platform', 'React Native', 'TypeScript', 'Cryptography'],
        year: "'25",
        link: '/rainydays',
    },
    {
        n: '02',
        title: 'My Website',
        desc: 'My site is a living history of my journey as a developer. It’s evolved from a simple starting point into what you see today—a space heavily inspired by grid systems and the power of typography to tell a story. In an era where everything is starting to look like an AI-generated template, I’m sticking to the script that works: doubling down on the fundamentals and the timeless basics of great design.',
        tags: ['TypeScript', 'React + Vite', 'Tailwind', 'CSS'],
        year: "'26",
        link: '',
    },
];

export const POSTS: Post[] = [
    {
        date: 'Feb 2026',
        readtime: '10 min',
        title: 'React Hooks: Stop Writing Class Components, Start Writing Functions',
        excerpt:
            'Before React 16.8, if you wanted your component to have state, handle side effects, or do anything beyond showing static HTML, you had to write a class component. Classes meant writing this.state, this.setState, binding methods in the constructor, and dealing with lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount.',
        tag: 'React',
        link: 'blogs/react-hooks',
    },
    {
        date: 'Jan 2026',
        readtime: '10 min',
        title: 'Spring Boot Dependency Injection: Stop Wiring Everything Yourself',
        excerpt:
            "Imagine you're building a house. You could cut every piece of lumber yourself, mix your own concrete, and forge your own nails. Or you could just tell the contractor 'I need a kitchen here' and they figure out the plumbing, electrical, and materials.",
        tag: 'Spring Boot',
        link: 'blogs/spring-boot-di',
    },
    {
        date: 'Jan 2026',
        readtime: '10 min',
        title: 'Zustand: Stop Passing Props Through 10 Components',
        excerpt:
            "If you've ever built a React app bigger than a todo list, you've probably hit a wall. You start with a few useState calls and it's fine. Then your app grows. Suddenly, you're passing callbacks and state through 5 layers of components just so a tiny button at the bottom can update something at the top",
        tag: 'State Management',
        link: 'blogs/zustand',
    },
    {
        date: 'Oct 2025',
        readtime: '5 min',
        title: 'How to Setup an .is-a.dev domain with GitHub pages',
        excerpt:
            "So, you've hosted your personal website on GitHub Pages, but as a broke dev, buying a custom domain isn't an option. Don't worry! I'll show you how to get a free .is-a.dev domain. It's not only a cool, memorable domain, but immediately signals the visitors that you are a developer!",
        tag: 'DNS',
        link: 'blogs/is-a-dev-domain',
    },
];

export const EXPERIENCE: Experience[] = [
    {
        years: '2024 — now',
        role: 'Software Engineer',
        company: 'Amihan Global Strategies',
        note: 'Full stack Engineer. Contributed to platforms generating to over $12M in gross revenue.',
        loc: 'Hybrid',
    },
    {
        years: '2024 — now',
        role: 'Application Support Engineer',
        company: 'Amihan Global Strategies',
        note: 'L3 Support for enterprise clients - BDO, SMDC, and Chemonics. Forensic debugging code-level issues and maintaining 99.9% system uptime and delivering feature enhancements based on client requirements',
        loc: 'Hybrid',
    },
];

export const NOW_ITEMS: Now[] = [
    { k: 'building', v: 'A group-emergency fund system', note: 'Mobile App - Offline-first architecture' },
    { k: 'learning', v: 'Cryptography', note: 'For a side project that keeps outgrowing itself.' },
    { k: 'learning', v: 'How to socialize', note: 'I know I sit and isolate a lot. I have no excuse.' },
];

export const REPOS: Repository[] = [
    {
        name: 'this-website',
        desc: 'My website.',
        lang: 'React, TypeScript',
        link: 'https://github.com/Karlroxas21/karlroxas21.github.io',
    },
    {
        name: 'rainydays-ui',
        desc: 'Emergency fund system mobile app with offline first architecture in mind.',
        lang: 'TypeScript, Java',
        link: '',
    },
];
