import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'node ./src/server.js',
    port: 3000,
  },
});
