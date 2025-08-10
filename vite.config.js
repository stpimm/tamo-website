import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
  base: '/tamo-website/',       // 👈 must match your repo name exactly
  build: { outDir: 'docs', emptyOutDir: true }
})
