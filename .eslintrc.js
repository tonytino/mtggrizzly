const eslintConfig = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@tanstack/query',
    '@typescript-eslint',
    'jsx-a11y',
    'react',
    'react-hooks',
    'testing-library',
  ],
  root: true,
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'react/react-in-jsx-scope': 'off',
    'testing-library/prefer-presence-queries': [
      'error',
      { absence: false, presence: true },
    ],
  },
};

module.exports = eslintConfig;
