module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
};
