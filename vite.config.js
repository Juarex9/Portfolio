import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-icons')) {
            return 'vendor-icons'
          }
          if (id.includes('i18next')) {
            return 'vendor-i18n'
          }
        }
      }
    }
  }
})
