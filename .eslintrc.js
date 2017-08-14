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
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // Rules that are currently broken due to scope analysis for the TypeScript parser not being ready yet.
        // These are caught by the compiler instead.
        'no-unused-vars': 'off',
        'no-undef': 'off'
      }
    }
  ]
};
