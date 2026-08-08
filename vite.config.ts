import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Playground dev server / demo build — not the library build (see vite.lib.config.ts).
export default defineConfig({
  root: 'playground',
  plugins: [react()],
  resolve: {
    alias: {
      'styled-system': path.resolve(import.meta.dirname, './styled-system'),
    },
  },
})
