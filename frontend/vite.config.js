import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.JPG'],
  plugins: [react()],
  define: {
    'process.env': {}  // Optional polyfill if needed for some legacy libraries
  },
})
