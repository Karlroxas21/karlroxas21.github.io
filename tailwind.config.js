/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{html,ts}'];
export const theme = {
    extend: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
        backgroundColor: {
            'gray-400-5': 'rgba(156, 163, 175, 0.05)',
            'custom-gray': '#202124',
        },
        textColor: {
            'custom-red': '#E84545',
        },
    },
};
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
export const plugins = [require('@tailwindcss/typography')];
