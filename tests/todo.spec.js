const { test, expect } = require('@playwright/test');

const TODO_URL = 'https://demo.playwright.dev/todomvc/';

test('kasutaja saab lisada ülesande', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Õpi UI testimist');
  await input.press('Enter');

  await expect(page.getByText('Õpi UI testimist')).toBeVisible();
});

test('kasutaja saab ülesande lõpetatuks märkida', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Esimene test');
  await input.press('Enter');

  const task = page.getByRole('listitem').filter({ hasText: 'Esimene test' });
  const checkbox = task.getByRole('checkbox');

  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

test('kasutaja saab ülesande kustutada', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Kustutatav ülesanne');
  await input.press('Enter');

  const task = page.getByRole('listitem').filter({ hasText: 'Kustutatav ülesanne' });
  await task.hover();
  await task.locator('button.destroy').click();

  await expect(page.getByText('Kustutatav ülesanne')).toHaveCount(0);
});

test('kasutaja saab lisada kaks ülesannet', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');

  await input.fill('Esimene ülesanne');
  await input.press('Enter');

  await input.fill('Teine ülesanne');
  await input.press('Enter');

  await expect(page.getByRole('listitem')).toHaveCount(2);
});
