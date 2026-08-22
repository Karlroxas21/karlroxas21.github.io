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
    industries: string[];
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

export type Education = {
    institution: string;
    area: string;
    years: string;
    loc: string;
    highlights: string[];
};

export type SkillGroup = {
    label: string;
    items: string[];
};

export type Publication = {
    title: string;
    authors: string[];
    venue: string;
    year: string;
    summary: string;
    doi: string;
};

export type Certification = {
    name: string;
    date: string;
};

export type Service = {
    n: string;
    title: string;
    desc: string;
    includes: string[];
    stack: string[];
};
