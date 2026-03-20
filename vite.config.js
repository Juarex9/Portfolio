import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'vendor-react'
          }
          if (id.includes('@chakra-ui') || id.includes('@emotion')) {
            return 'vendor-chakra'
          }
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('i18next')) {
            return 'vendor-i18n'
          }
          if (id.includes('react-icons')) {
            return 'vendor-icons'
          }
        }
      }
    }
  }
})
