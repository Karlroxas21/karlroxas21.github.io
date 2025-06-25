import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    {
        ignores: [
            '.data',
            '.deployment',
            '.github',
            '.vscode',
            '.angular',
            'build',
            'db',
            'docs',
            'misc',
            'node_modules',
            'dist',

            'tsconfig.json',
        ],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },
];
