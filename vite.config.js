import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-local-fallback',
      configureServer(server) {
        server.middlewares.use('/api/spotify', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ isPlaying: false, localDev: true }));
        });
      }
    }
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
