module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'one-var': ['off'],
    'prefer-const': ['warn']
  }
}
