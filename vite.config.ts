import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: [
      'src/pages/**/components/**/*.spec.{ts,tsx}',
      'src/pages/**/components/**/*.test.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test/unit/coverage',
      include: ['src/pages/**/components/**/*.{ts,tsx}'],
      exclude: [
        'src/pages/**/components/**/*.spec.{ts,tsx}',
        'src/pages/**/components/**/*.test.{ts,tsx}',
      ],
    },
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ...vitestConfig,
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@model': path.resolve(__dirname, './src/model'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@router': path.resolve(__dirname, './src/router'),
      '@layout': path.resolve(__dirname, './src/layout'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/cca-be': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cca-be/, ''),
      },
      '/stg-be': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/stg-be/, ''),
      },
    },
  },
});
