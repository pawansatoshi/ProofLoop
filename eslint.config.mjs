import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig({
  files: ['**/*.{js,mjs,ts,tsx}'],
  ignores: ['dist/**', 'node_modules/**', '.testmuai/output/**'],
  extends: [js.configs.recommended, tseslint.configs.recommended],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
})
