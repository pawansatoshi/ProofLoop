import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig({
  files: ['**/*.{js,mjs,ts,tsx}'],
  ignores: ['dist/**', 'node_modules/**', '.testmuai/output/**'],
  extends: [js.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    globals: {
      AbortSignal: 'readonly',
      URL: 'readonly',
      URLSearchParams: 'readonly',
      console: 'readonly',
      document: 'readonly',
      fetch: 'readonly',
      process: 'readonly',
      setTimeout: 'readonly',
      window: 'readonly',
    },
  },
  rules: {
    'no-console': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
})
