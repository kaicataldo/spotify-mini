/* eslint-env node */

module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:vue/recommended'],
  parserOptions: {
    parser: 'typescript-eslint-parser'
  },
  env: {
    browser: true,
    node: false
  },
  rules: {
    'no-console': 'error',
    // Rules that are currently broken due to scope analysis for the TypeScript parser not being ready yet.
    // These are caught by the compiler instead.
    'no-unused-vars': 'off',
    'no-undef': 'off'
  }
};
