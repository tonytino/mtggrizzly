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
    '@typescript-eslint/no-var-requires': 'off',
    // While a great feature, the nature of this app would make it too
    // expensive financially to leverage this throughout
    '@next/next/no-img-element': 'off',
  },
};

module.exports = eslintConfig;
