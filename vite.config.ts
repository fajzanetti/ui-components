import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // O deploy publica o site em um subcaminho do GitHub Pages.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  resolve: {
    // Os exemplos importam por '@/components/...' para mostrar um caminho de uso real.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['src/test/setup.ts'],
  },
})
