/* eslint-env node */

module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: false
  }
};
