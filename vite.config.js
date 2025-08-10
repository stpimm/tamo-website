import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
  // IMPORTANT: use your repo name (project page)
  base: '/tamo-wesbite/',
  // Build straight into /docs so Pages can serve it from main/docs
  build: { outDir: 'docs', emptyOutDir: true }
})
