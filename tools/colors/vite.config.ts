import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/colors/',
  build: {
    outDir: '../../public/colors',
    emptyOutDir: true,
  },
  server: {
    port: 5175,
  },
})
