import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@focus-loop/core-timers': path.resolve(__dirname, 'src/components/__mocks__/@focus-loop/core-timers.tsx'),
    },
  },
  css: {
    postcss: {},
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'vitest.setup.ts',
    include: ['src/**/*.{test,spec}.tsx'],
  },
}); 