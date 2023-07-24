import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './configs/vite-env/',
  resolve: {
    alias: [{ find: '@src', replacement: path.resolve(__dirname, 'src') }],
  },
});
