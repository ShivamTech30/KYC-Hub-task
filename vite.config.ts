import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'KYC-Hub-task',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
