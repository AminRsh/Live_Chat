import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv(process.env.NODE_ENV, process.cwd())

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  }, define: {
    'process.env': env,
  },
})




// export default defineConfig({
//   plugins: [react()],
  // server: {
  //   port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'https://api.pexels.com/v1',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
// })