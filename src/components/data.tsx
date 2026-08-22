import type {
    Profile,
    Link,
    About,
    Project,
    Post,
    Experience,
    Now,
    Repository,
    Education,
    SkillGroup,
    Publication,
    Certification,
    Service,
} from './types';

export const PROFILE: Profile = {
    name: 'Karl Marx Roxas',
    role: 'Full Stack Software Engineer',
    location: 'Taguig, PH',
    timezone: 'UTC+08:00',
    status: 'Open to mid level roles, anytime',
    initials: 'KMR',
    tagline: (
        <>
            I build <em>calm, durable</em> systems
            <br />
            for the messy parts of the web.
        </>
    ),
    sub: 'Software engineer, two years in. Modernizing legacy systems and sustaining mission critical enterprise applications. .NET and Azure on the backend, ReactAdd a on the front.',
    industries: ['Fintech', 'Real Estate', 'Enterprise', 'Maritime'],
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
            I've spent two years <em>writing, shipping, and deleting</em> software, from a one person web app to
            production touching hundreds of requests a day. I care about the work, not the stack.
        </>
    ),
    cols: [
        "I'm Karl, a software engineer who enjoys building useful, purposeful websites that actually work well. Lately that means rebuilding a legacy .NET monolith into cloud native services, and forensic debugging: tracing data through complex systems until the real fix shows up.",
        "These days I work mostly in TypeScript, C#, and .NET. React on the front, .NET, and Express on the back, with detours into Azure and AWS. Off hours, you'll find me at the gym and outside running, cycling or hiking.",
    ],
    stats: [
        { k: 'based', v: 'Taguig, PH' },
        { k: 'since', v: '2024' },
        { k: 'stack', v: 'TS · C# · React' },
        { k: 'available', v: 'Any time' },
    ],
};

export const PROJECTS: Project[] = [
    {
        n: '01',
        title: 'PostWall',
        desc: 'A minimal, native sticky notes app for Mac, Windows and Linux. Paper warm colors that are easy on the eyes, a quiet WYSIWYG editor, and a wall that finally feels like yours.',
        tags: ['Desktop', 'Cross platform', 'TypeScript', 'WYSIWYG'],
        year: "'26",
        link: '/postwall',
    },
    {
        n: '02',
        title: 'RainyDays',
        desc: 'A family emergency fund system for countries where hospital bills arrive before help does. Offline first mobile app built with React Native and Expo. Enforces transparency, contribution limits, and abuse prevention without ever holding or pooling money.',
        tags: ['Cross platform', 'React Native', 'TypeScript', 'Cryptography'],
        year: "'25",
        link: '/rainydays',
    },
    {
        n: '03',
        title: 'My Website',
        desc: 'My site is a living history of my journey as a developer. It’s evolved from a simple starting point into what you see today, a space heavily inspired by grid systems and the power of typography to tell a story. In an era where everything is starting to look like an AI generated template, I’m sticking to the script that works: doubling down on the fundamentals and the timeless basics of great design.',
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
        years: '2026 — now',
        role: 'Software Developer',
        company: 'ME-ICT',
        note: 'Rebuilding a legacy .NET stored procedure monolith into cloud native microservices on Azure, using Hexagonal Architecture and EF Core for clean domain boundaries. Building backend services in .NET 10 and C#, deployed to Azure App Services with Service Bus and Blob Storage.',
        loc: 'Hybrid',
    },
    {
        years: '2024 — 2026',
        role: 'Software Engineer',
        company: 'Amihan Global Strategies',
        note: 'Led the full lifecycle migration of the BDO internal system from Angular 7 to Angular 18, cutting estimated page load times by ~30%. Shipped frontend and backend for internal ventures (Bahai Deals, Chemlink) with Next.js, Express.js and TypeScript, contributing to platforms generating over $12M in gross revenue.',
        loc: 'Remote',
    },
    {
        years: '2024 — 2026',
        role: 'Associate Application Support Engineer',
        company: 'Amihan Global Strategies',
        note: 'L3 support for enterprise clients BDO and SMDC. Forensic debugging on legacy codebases: tracing data flow through complex systems, digging through code history, and recommending long term architectural fixes over quick patches. Maintained 99% system uptime and ran containerized workloads on AWS with Docker and Kubernetes.',
        loc: 'Remote',
    },
];

export const NOW_ITEMS: Now[] = [
    { k: 'building', v: 'PostWall', note: 'Native sticky notes for Mac, Windows and Linux.' },
    { k: 'learning', v: '.NET 10 and Azure', note: 'Hexagonal Architecture, EF Core, Service Bus.' },
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
        name: 'rainy-days',
        desc: 'Emergency fund system mobile app with offline first architecture in mind.',
        lang: 'TypeScript, Java',
        link: 'https://github.com/Karlroxas21/rainy-days',
    },
];

export const SKILLS: SkillGroup[] = [
    { label: 'Frontend', items: ['Angular', 'React', 'React Native', 'Expo', 'Next.js', 'HTML', 'CSS'] },
    { label: 'Backend', items: ['Spring Boot', '.NET 10', 'Express.js', 'TypeScript', 'Java', 'Go'] },
    { label: 'Tools & Platforms', items: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'Git', 'Postman', 'Linux', 'Figma'] },
    {
        label: 'AI',
        items: ['Prompt Engineering', 'Spec Driven Development', 'Agentic Development', 'RAG', 'LLMs', 'GenAI'],
    },
    { label: 'Databases', items: ['SQL Server', 'Redis', 'SQL', 'NoSQL', 'Neo4j'] },
];

export const EDUCATION: Education[] = [
    {
        institution: 'National University',
        area: 'BS Information Technology',
        years: '2020 — 2024',
        loc: 'Manila, PH',
        highlights: [
            'Capstone: Ecotopia, a parallax enabled website for climate change awareness with an interactive mini arcade game.',
            'GWA 3.49, Cum Laude.',
        ],
    },
];

export const PUBLICATIONS: Publication[] = [
    {
        title: 'Ecotopia: A Parallax Enabled Website for Climate Change Awareness with Interactive Mini Arcade Game',
        authors: ['Karl Marx Roxas', 'Vincent Regala', 'Elaine Maura San Roque', 'Karina Dela Cruz'],
        venue: 'HNICEM',
        year: '2023',
        summary: 'A website focused on raising awareness about climate change.',
        doi: '10.1109/HNICEM60674.2023.10589019',
    },
];

export const CERTIFICATIONS: Certification[] = [
    { name: 'AI for Research and Insights', date: 'Jun 2026' },
    { name: 'AI for Brainstorming and Planning', date: 'Jun 2026' },
    { name: 'AI Fundamentals', date: 'Jun 2026' },
    { name: 'Foundational C# with Microsoft', date: 'Apr 2026' },
    { name: 'AWS Cloud Practitioner Essentials', date: 'Mar 2026' },
    { name: 'freeCodeCamp Backend Development and APIs', date: 'Mar 2024' },
];

export const SERVICES: Service[] = [
    {
        n: '01',
        title: 'Full Stack Web Development',
        desc: 'Features shipped end to end, from schema and API through to the screen someone actually uses. I write the backend and the frontend, so nothing gets lost in the handoff.',
        includes: [
            'Product features from spec to production',
            'REST APIs and service layers with clean domain boundaries',
            'Responsive, accessible UI that holds up on real devices',
            'Code review and architecture guidance for your team',
        ],
        stack: ['React', 'Next.js', 'Angular', '.NET', 'Spring Boot', 'Express.js', 'TypeScript'],
    },
    {
        n: '02',
        title: 'Legacy Modernization & Migration',
        desc: "Old codebases that still print money but nobody wants to touch. I've taken Angular 7 to Angular 18 and a .NET stored procedure monolith to cloud native services. Incrementally, with the lights on the whole time.",
        includes: [
            'Framework and runtime version migrations',
            'Monolith to service decomposition, Hexagonal and Clean Architecture',
            'Forensic debugging that traces data flow to real root cause, not the nearest patch',
            'Performance work on pages and queries that got slow years ago',
        ],
        stack: ['Angular', '.NET 10', 'C#', 'EF Core', 'Java', 'SQL Server'],
    },
    {
        n: '03',
        title: 'Mobile Apps & Cloud Deployment',
        desc: 'Cross platform apps for iOS and Android from one codebase, plus the pipeline that gets them and your services deployed without a manual checklist.',
        includes: [
            'React Native and Expo apps, offline first where it matters',
            'Containerized workloads on Azure and AWS',
            'CI/CD pipelines, environment and secret configuration',
            'Async messaging, object storage, and caching setup',
        ],
        stack: ['React Native', 'Expo', 'Azure', 'AWS', 'Docker', 'Kubernetes'],
    },
    {
        n: '04',
        title: 'AI Integration & Agentic Development',
        desc: 'AI that answers from your data instead of guessing. The chatbot on this site is the short version: grounded in my own content, keys proxied server side, no API secrets shipped to the browser.',
        includes: [
            'Chatbots and assistants grounded in your docs, catalog, or knowledge base',
            'RAG pipelines: retrieval, chunking, and evaluation that survives real questions',
            'Agentic workflows: tool calling, multi step tasks, and human in the loop checkpoints',
            'Spec driven development: write the contract first, let agents build against it',
            'Secure key handling via edge proxies, plus cost and token budgeting',
        ],
        stack: ['LLMs', 'RAG', 'Prompt Engineering', 'Claude', 'Gemini', 'OpenRouter', 'Cloudflare Workers'],
    },
];
