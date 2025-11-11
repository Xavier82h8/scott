const { test, expect } = require('@playwright/test');

test('homepage has correct title and screenshot', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/attomos/templates/index.html');
  await expect(page).toHaveTitle(/Attomos/);
  await page.screenshot({ path: 'tests/screenshots/index.png', fullPage: true });
});

test('contact page has correct title and screenshot', async ({ page }) => {
    await page.goto('file://' + process.cwd() + '/attomos/templates/contact.html');
    await expect(page).toHaveTitle(/Attomos/);
    await page.screenshot({ path: 'tests/screenshots/contact.png', fullPage: true });
});
