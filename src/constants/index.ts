import type { WindowConfig } from '@store/window';

const dockApps = [
    {
        id: 'files',
        name: 'Portfolio',
        icon: '/images/files.png',
        canOpen: true,
    },
    {
        id: 'firefox',
        name: 'Articles',
        icon: '/images/firefox_logo.png',
        canOpen: true,
    },
    {
        id: 'terminal',
        name: 'Skills',
        icon: '/images/terminal.png',
        canOpen: true,
    },
    {
        id: 'ubuntu',
        name: 'Contact',
        icon: '/icons/ubuntu-dock.svg',
        canOpen: true,
    },
];

const blogPosts = [
    {
        id: 1,
        date: 'Feb. 14, 2026',
        title: 'React Hooks: Stop Writing Class Components, Start Writing Functions',
        image: '/thumbnails/react-hooks-thumbnail.png',
        link: '/blogs/react-hooks',
    },

    {
        id: 2,
        date: 'Jan. 30, 2026',
        title: 'Spring Boot DI: Stop Wiring Everything Yourself',
        image: '/thumbnails/spring-boot-di-thumbnail.png',
        link: '/blogs/spring-boot-di',
    },
    {
        id: 3,
        date: 'Jan. 20, 2026',
        title: 'Zustand: Stop Passing Props Through 10 Components',
        image: '/thumbnails/zustand-thumbnail.png',
        link: '/blogs/zustand',
    },
    {
        id: 4,
        date: 'Oct. 3, 2025',
        title: 'How to Set Up an .is-a.dev Domain with GitHub Pages',
        image: '/thumbnails/is-a-dev-thumbnail.png',
        link: '/blogs/is-a-dev-domain',
    },
];

// TODO: Add sample demo each of skills so that they have a proof that I am qualified.
const techStack = [
    {
        category: 'Frontend',
        items: ['React + Vite', 'Angular', 'Nextjs', 'TypeScript'],
    },
    {
        category: 'Mobile',
        items: ['React Native', 'Expo'],
    },
    {
        category: 'AI',
        items: ['Prompt Engineering', 'Agentic AI Development'],
    },
    {
        category: 'Styling',
        items: ['Tailwind CSS', 'CSS', 'shadcn'],
    },
    {
        category: 'Backend',
        items: ['Node.js', 'Express.js', 'Spring Boot', 'Java', 'Typescript'],
    },
    {
        category: 'Database',
        items: ['PostgreSQL', 'Neo4J', 'Redis', 'NoSQL'],
    },
    {
        category: 'Testing',
        items: ['Karma', 'Jest', 'Playwright', 'JUnit'],
    },
    {
        category: 'Dev Tools',
        items: ['Git', 'GitHub', 'Docker', 'Kubernetes'],
    },
];

export { dockApps, blogPosts, techStack };

export const WORK_LOCATION = {
    id: 1,
    type: 'work',
    name: 'Work',
    icon: '/icons/work.svg',
    kind: 'folder',
    children: [
        {
            id: 5,
            name: 'RainyDays',
            icon: '/images/folder.png',
            kind: 'folder',
            children: [
                {
                    id: 1,
                    name: 'RainyDays.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    description: [
                        'This product is a family emergency fund coordination system designed for countries with weak healthcare safety nets.',
                        'It helps families pre-commit money, define clear emergency rules, and make fast, fair decisions when hospital bills hit without holding or pooling funds. By enforcing transparency, approvals, and contribution-based limits, the system replace panic, guilt, and chaos with clarity and speed during life-and-death situations.',
                        'When time matters most, families decide faster, argue less, and act together.',
                    ],
                },
                {
                    id: 2,
                    name: 'GitHub',
                    icon: '/images/GitHub.png',
                    kind: 'file',
                    fileType: 'url',
                    href: 'https://github.com/Karlroxas21/rainy-days',
                    position: 'top-10 right-20',
                },
                {
                    id: 5,
                    name: 'Design.fig',
                    icon: '/images/plain.png',
                    kind: 'file',
                    fileType: 'fig',
                    href: 'https://www.figma.com/design/lJeGzU0ssVFAYPBINDCWjW/RainyDays?node-id=0-1&p=f&t=fFlv3w1sVYax5eNx-0',
                    position: 'top-60 right-20',
                },
            ],
        },
    ],
};

export const ABOUT_LOCATION = {
    id: 2,
    type: 'about',
    name: 'About me',
    icon: '/icons/info.svg',
    kind: 'folder',
    children: [
        {
            id: 1,
            name: 'me.png',
            icon: '/images/me.png',
            kind: 'file',
            fileType: 'img',
            position: 'top-10 left-5',
            imageUrl: '/images/me.png',
        },
        {
            id: 2,
            name: 'me-again.png',
            icon: '/images/me_3.png',
            kind: 'file',
            fileType: 'img',
            position: 'top-10 left-5',
            imageUrl: '/images/me_3.png',
        },
        {
            id: 3,
            name: 'about-me.txt',
            icon: '/images/txt.png',
            kind: 'file',
            fileType: 'txt',
            position: 'top-60 left-5',
            subtitle: 'Meet the dev behind zeros and ones',
            image: '/images/me_2.png',
            description: [
                'I’m Karl 👋, a software engineer who enjoys building useful, purposeful websites that actually work well.',
                'I specialize in Typescript, Java, Spring Boot, React, Angular and Next.js.',
                'I build elegant, clean UI, thoughtful UX and human-readable code.',
                "Outside of dev work, you'll find me at the gym and outside running or cycling.",
            ],
        },
    ],
};

export const RESUME_LOCATION = {
    id: 3,
    type: 'resume',
    name: 'Resume',
    icon: '/icons/file.svg',
    kind: 'folder',
    children: [
        {
            id: 1,
            name: 'Resume.pdf',
            icon: '/images/pdf.png',
            kind: 'file',
            fileType: 'pdf',
            // add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};

export const EXPERIENCE_LOCATION = {
    id: 4,
    type: 'experience',
    name: 'Experience',
    icon: '/icons/briefcase.svg',
    kind: 'folder',
    children: [
        {
            id: 6,
            name: 'Amihan Global Strategies - Hybrid',
            icon: '/images/folder.png',
            kind: 'folder',
            children: [
                {
                    id: 11,
                    name: 'Role.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    description: [
                        'Associate Application Support Engineer & Software Engineer',
                        'Oct 2024 - Present',
                        'Amihan Global Strategies',
                    ],
                },
                {
                    id: 12,
                    name: 'Amihan Global Strategies - Hybrid.txt',
                    icon: '/images/txt.png',
                    kind: 'file',
                    fileType: 'txt',
                    description: [
                        '- Led the full-lifecycle migration of BDO Internal System from Angular 7 to Angular 18, modernizing the legacy codebase to use the Ivy Engine and reducing estimated page load times by ~30%.',
                        '- Assigned as Software Engineer for internal ventures (Bahai Deals), and Chemlink (talent network powered by AI) using Next.js, ExpressJS, and Typescript, contributing to platforms generating to over $12M in gross revenue.',
                        '- Exposed to AWS Environment and conducted code reviews to enforce Clean Architecture standards and practices.',
                        '- Provided L3 full-stack support for enterprise clients like BDO, and SMDC. Diagnosing complex code-level issues, maintining 99% system uptime and delivering feature enhancements based on client requirements.',
                        '- Collaborated with stakeholders and internal teams to translate business and product requirements into clear, functional, and maintainable frontend components.',
                    ],
                },
            ],
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    experience: EXPERIENCE_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG: WindowConfig = {
    files: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    firefox: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    ubuntu: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
