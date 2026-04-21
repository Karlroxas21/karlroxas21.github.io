import type { ReactNode } from 'react';

export type Profile = {
    name: string;
    role: string;
    location: string;
    timezone: string;
    status: string;
    initials: string;
    tagline: ReactNode;
    sub: string;
    email: string;
};

export type Link = {
    k: string;
    v: string;
    href: string;
};

export type Stat = {
    k: string;
    v: string;
};

export type About = {
    lede: ReactNode;
    cols: string[];
    stats: Stat[];
};

export type Project = {
    n: string;
    title: string;
    desc: string;
    tags: string[];
    year: string;
    link: string;
};

export type Post = {
    date: string;
    readtime: string;
    title: string;
    excerpt: string;
    tag: string;
    link: string;
};

export type Experience = {
    years: string;
    role: string;
    company: string;
    note: string;
    loc: string;
};

export type Now = {
    k: string;
    v: string;
    note: string;
};

export type Repository = {
    name: string;
    desc: string;
    lang: string;
    link: string;
};
