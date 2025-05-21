import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:8081',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});