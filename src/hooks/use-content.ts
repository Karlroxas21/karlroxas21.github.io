import { useLocale } from '../providers/locale-context';

/**
 * Returns the active locale's content under the same names the components used
 * when data was static (PROFILE, ABOUT, …). Re-renders on language switch.
 */
export const useContent = () => {
    const { content } = useLocale();
    return {
        PROFILE: content.profile,
        LINKS: content.links,
        ABOUT: content.about,
        PROJECTS: content.projects,
        POSTS: content.posts,
        EXPERIENCE: content.experience,
        NOW_ITEMS: content.now,
        REPOS: content.repos,
    };
};
