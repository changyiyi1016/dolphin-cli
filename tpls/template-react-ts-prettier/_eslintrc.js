// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    root: true,
    env: {
        es6: true, // enable ES2015 features.
        browser: true, // enable use of global browser variables like `windows`.
        node: true, // enable use of global node variables like `process`.
    },
    parser: '@typescript-eslint/parser', // Allows Eslint to understand TypeScript syntax.
    extends: [
        'eslint:recommended', // Eslint recommended configuration by eslint.
        'plugin:import/recommended', // Linting of ES2015+ import/export syntax.
        'plugin:react/recommended', // Recommended react linting configs.
        'plugin:react-hooks/recommended', // Recommended react hooks linting configs.
        'plugin:jsx-a11y/recommended', // Turns on a11y rules for JSX.
        'plugin:@typescript-eslint/recommended', // Turns on rules from TypeScript-specific plugin.
        'plugin:prettier/recommended', // Turns off all rules that are unnecessary or might conflict with Prettier.
    ],
    plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
    rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
    },

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2021, // ECMAScript version supported in the project.
        sourceType: 'module', // set to `module` because we ue ECMAScript modules.
        ecmaFeatures: {
            jsx: true, // enable jsx for React.
        },
    },
    settings: {
        react: {
            version: 'detect', // auto-detect React version from package.json.
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'], // use typescript-eslint parser for .ts|tsx files.
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn"t contain any source code, like `@types/unist`.
            },
        },
    },
});
