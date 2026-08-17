import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/data/',
  build: {
    outDir: '../../public/data',
    emptyOutDir: true,
  },
  server: {
    port: 5176,
  },
})
