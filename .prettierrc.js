module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  overrides: [
    {
      files: '*.{scss,sass,css}',
      options: {
        singleQuote: false,
        printWidth: 120,
      },
    },
    {
      files: '*.{json,yml,yaml}',
      options: {
        tabWidth: 2,
      },
    },
  ],
};
