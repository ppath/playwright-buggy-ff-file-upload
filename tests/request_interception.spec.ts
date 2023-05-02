import { APIResponse, expect, test } from '@playwright/test';

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

test('should intercept posting of form[enctype=application/x-www-form-urlencoded]', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text="Browse your files:"')).toBeVisible();
  await page.locator('#submit-button').click();
  await delay(1);
});

test('should intercept posting of file with size 1023KB', async ({ page }) => {
  await page.goto('/?multipart');
  await expect(page.locator('text="Browse your files:"')).toBeVisible();
  await page.locator('[type=file]').setInputFiles('./test-data/1023KB');
  await page.locator('#submit-button').click();
  await delay(1);
});

test('should intercept posting of file with size 1024KB', async ({ page }) => {
  await page.goto('/?multipart');
  await expect(page.locator('text="Browse your files:"')).toBeVisible();
  await page.locator('[type=file]').setInputFiles('./test-data/1024KB');
  await page.locator('#submit-button').click();
  await delay(1);
});
