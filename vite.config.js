import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'huanghe-delta-data-platform'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: true
  }
})
