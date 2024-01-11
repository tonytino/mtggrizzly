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
    '@typescript-eslint',
    'jsx-a11y',
    'react',
    'react-hooks',
    'testing-library',
  ],
  root: true,
  rules: {
    'react/react-in-jsx-scope': 'off',
    'testing-library/prefer-presence-queries': [
      'error',
      { absence: false, presence: true },
    ],
    // While a great feature, the nature of this app would make it too
    // expensive financially to leverage this throughout
    '@next/next/no-img-element': 'off',
  },
  overrides: [
    {
      files: ['./scripts/*', './jest.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: '*.cy.ts',
      rules: {
        'testing-library/await-async-queries': 'off',
        'testing-library/prefer-screen-queries': 'off',
      },
    },
  ],
};

module.exports = eslintConfig;
