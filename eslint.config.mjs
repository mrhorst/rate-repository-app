// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import jestPlugin from 'eslint-plugin-jest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends('eslint:recommended', 'plugin:react/recommended'),
    files: ['**/*.{js,jsx}', 'App.js'],
    plugins: {
      react,
      'react-native': reactNative,
    },
    languageOptions: {
      globals: {
        ...reactNative.environments['react-native']['react-native'],
      },
      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Tests: enable Jest globals and rules
  {
    files: ['src/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
]);
