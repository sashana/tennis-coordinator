import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import preact from '@preact/preset-vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  const sport = env.VITE_SPORT || 'tennis';

  return {
    root: '.',
    base: './',
    plugins: [preact()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
    build: {
      outDir: `dist/${sport}`,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          ttmd: resolve(__dirname, 'ttmd.html'),
          'whats-new': resolve(__dirname, 'whats-new.html'),
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      // Allow connections from local subdomains (tennis.localhost, pickleball.localhost)
      host: true,
      // Explicitly allow these hosts for HMR and security
      allowedHosts: [
        'localhost',
        'tennis.localhost',
        'pickleball.localhost',
        'squash.localhost',
        'padel.localhost',
      ],
    },
    preview: {
      port: 3000,
    },
  };
});
