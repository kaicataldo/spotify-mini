module.exports = {
  parser: 'typescript-eslint-parser',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 'off'
  }
};
