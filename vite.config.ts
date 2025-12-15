import { defineConfig, Plugin, Connect } from 'vite';
import { resolve } from 'path';
import { rename } from 'fs/promises';
import preact from '@preact/preset-vite';
import { readFileSync } from 'fs';

// Plugin to rename new-index.html to index.html after build
function renameIndexHtml(): Plugin {
  return {
    name: 'rename-index-html',
    closeBundle: async () => {
      try {
        await rename('dist/new-index.html', 'dist/index.html');
      } catch {
        // File may not exist in dev mode
      }
    },
  };
}

export default defineConfig({
  root: '.',
  base: './',
  plugins: [preact(), renameIndexHtml()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'new-index.html'),
        app: resolve(__dirname, 'app.html'),
        ttmd: resolve(__dirname, 'ttmd.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    middlewares: [
      // Serve app.html for root path in development
      (req, res, next) => {
        if (req.url === '/') {
          req.url = '/app.html';
        }
        next();
      },
    ],
  },
  preview: {
    port: 3000,
  },
});
