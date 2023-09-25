/** @type {import("prettier").Config} */
const prettierConfig = {
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};

module.exports = prettierConfig;
