import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// Library build — produces the publishable dist/ output. Separate from
// vite.config.ts (the playground dev server / demo build).
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      tsconfigPath: 'tsconfig.lib.json',
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
