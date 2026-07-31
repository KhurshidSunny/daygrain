import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/decide/',
  build: {
    outDir: '../../public/decide',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
  },
})
