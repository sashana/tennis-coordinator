import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      // Build as library for now - can be used to validate TypeScript modules
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TennisCoordinator',
      fileName: 'tennis-coordinator',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Externalize Firebase - it will be loaded separately
      external: ['firebase/app', 'firebase/database'],
      output: {
        globals: {
          'firebase/app': 'firebase',
          'firebase/database': 'firebase.database',
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
