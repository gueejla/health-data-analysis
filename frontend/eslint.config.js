import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import { fixupPluginRules } from '@eslint/compat'
import tailwindcss from 'eslint-plugin-tailwindcss'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
  },
  // Tailwind rules via compat layer (legacy format)
  ...compat.config({
    plugins: { tailwindcss },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'off', // v4 theme names aren't recognized yet
    },
  }),
])
