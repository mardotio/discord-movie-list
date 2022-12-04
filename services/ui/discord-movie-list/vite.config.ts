/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    hmr: {
      path: 'ws',
    },
  },
  build: {
    target: 'esnext',
  },
});
