import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testDir: './tests',
    baseURL: 'http://localhost:8080',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});