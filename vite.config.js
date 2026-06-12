import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/bob-gala-tracer/',
  server: {
    port: 3000,
    open: true
  }
})

// Made with Bob
