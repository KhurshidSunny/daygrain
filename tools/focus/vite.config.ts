import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/focus/',
  build: {
    outDir: '../../public/focus',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
