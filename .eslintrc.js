module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['src/main/**/*'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['src/renderer/**/*'],
      plugins: ['react'],
      extends: ['plugin:react/recommended'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      env: {
        browser: true,
        node: false
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    }
  ]
};
