import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.pexels.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          Authorization: "kAjCHUL3B0us6dbJBna3ANSI4z2SeQknxKSYbRufppFsKysW5uOkAtxC", 
        },
      }
    }
  }
})
