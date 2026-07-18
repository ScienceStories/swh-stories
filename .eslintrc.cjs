module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/all',
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.app.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jsx-a11y',
    'react',
    'react-refresh',
    'simple-import-sort',
  ],
  root: true,
  rules: {
    'react/jsx-max-depth': 0,
    'react/jsx-newline': 0,
    'react/jsx-no-literals': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': [2, {
      functions: 'defaultArguments',
    }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
