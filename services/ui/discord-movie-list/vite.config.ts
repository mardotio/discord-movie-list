/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [solidPlugin(), tsConfigPaths()],
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
