import { test } from '@playwright/test';

const delay = (timeInSeconds = 0) => new Promise(resolve => {
  setTimeout(resolve, timeInSeconds * 1000);
});

test.beforeEach(async ({ page }) => {
  page.on('console', message => {
    console.log(message.text());
  });
  await page.route('**/api/**', async (route, req) => {
    console.log('REQUEST INTERCEPTED:', req.url(), req.method());
    await route.continue();
  });
});

test('should intercept POSTing of 10KB payload', async ({ page }) => {
  await page.goto('/?10KB_payload');
  await page.locator('#submit-button').click();
  await delay(1);
});

test('should intercept POSTing of 10MB payload', async ({ page }) => {
  await page.goto('/?10MB_payload');
  await page.locator('#submit-button').click();
  await delay(1);
});

test('should intercept PUTing of 10MB payload', async ({ page }) => {
  await page.goto('/?10MB_payload&method=PUT');
  await page.locator('#submit-button').click();
  await delay(1);
});
