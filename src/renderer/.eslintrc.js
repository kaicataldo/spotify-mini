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
    'no-console': 'error'
  }
};
