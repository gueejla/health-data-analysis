import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { '/api-v1': 'http://localhost:8080' },
    open: 'index.html',
  },
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
