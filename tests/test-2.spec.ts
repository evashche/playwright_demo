import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://store.cpanel.net/index.php');
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter your email.' }).click();
  await page.locator('#logincontent').click();
  await page.getByRole('link', { name: 'Store', exact: true }).click();
  await page.getByRole('link', { name: 'Browse All' }).click();
  await page.locator('#product3-order-button').click();
  await page.getByRole('textbox', { name: 'IP Address *' }).click();
  await page.getByRole('textbox', { name: 'IP Address *' }).fill('2.2.2.2');
  await page.getByRole('textbox', { name: 'IP Address *' }).press('Enter');
  await page.locator('.panel-add').first().click();
  await page.getByText('$35.89 USD').click();
  await page.getByRole('button', { name: 'Continue ' }).click();
  await page.getByText('cPanel Solo® Cloud (1 Account').click();
  await page.getByText('Monthly CloudLinux').click();
  await page.getByText('$18.28 USD').click();
  await page.getByText('$17.61 USD').click();
  await page.getByRole('link', { name: 'Checkout ' }).click();
  await page.getByText('CONFIGURE').click();
  await page.getByText('1', { exact: true }).click();
});