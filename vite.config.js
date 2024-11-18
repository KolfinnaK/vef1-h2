import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
});
