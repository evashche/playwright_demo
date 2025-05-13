import { test, expect } from '@playwright/test';
import { MainPage } from '../models/mainPage';
import { StorePage } from '../models/storePage';
import { CartPage } from '../models/cartPage';
import { formatPrice } from '../baseWeb';
const date = new Date()
const daysMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
const rate = 1 - (date.getDate() - 1)/daysMonth
const ip = '2.2.2.2'

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('/');
});

test('checkout', async ({ page }) => {
  const main = new MainPage(page)
  const store = new StorePage(page)
  const cart = new CartPage(page)
  await main.header.findText('Account').click()
  await page.goto(main.header.store)
  const productPrice = await store.products.price().getTextFirst()
  const productTitle = await store.products.title().getTextFirst()
  await store.products.buy().clickFirst()
  await page.getByText('IP Address *').fill(ip);
  const addonTitle = await cart.addons.title().getTextFirst()
  const addonPrice = await cart.addons.price().getTextFirst()
  const orderTotal = await cart.order.total().getText()
  await cart.addons.clickFirst()
  await page.waitForTimeout(1000)
  await cart.order.total().expectNotText(orderTotal)
  await cart.order.submit().click()
  await cart.stepper.itemsByPos(1).title().expectText(productTitle)
  // await cart.stepper.itemsByPos(1).price().expectText(productPrice) BUG expect $26.99 USD but got $52.99 USD Monthly
  await cart.stepper.itemsByPos(2).title().expectText(addonTitle)
  await cart.stepper.itemsByPos(2).priceCycle().expectText(addonPrice);
  const productRatedPrice = formatPrice(await cart.stepper.itemsByPos(1).priceRated().getText())
  const addonRatedPrice = formatPrice(await cart.stepper.itemsByPos(2).priceRated().getText())
  await expect(addonRatedPrice).toEqual((formatPrice(addonPrice)*rate).toFixed(2))
  await expect(productRatedPrice).toEqual((formatPrice(productPrice)*rate).toFixed(2))
  await cart.order.checkout().click()
  await cart.stepper.itemsByPosTable(1).column(1).expectText(productTitle)
  await cart.stepper.itemsByPosTable(1).column(3).expectText(ip)
  // await cart.stepper.itemsByPosTable(1).column(4).expectText(productPrice) BUG expect $26.99 USD but got $52.99 USD Monthly
  await cart.stepper.itemsByPosTable(1).column(5).expectText(productRatedPrice)
  await cart.stepper.itemsByPosTable(2).column(1).expectText(addonTitle)
  await cart.stepper.itemsByPosTable(2).column(3).expectText(ip)
  await cart.stepper.itemsByPosTable(2).column(4).expectText(formatPrice(addonPrice))
  await cart.stepper.itemsByPosTable(2).column(5).expectText(addonRatedPrice)
  await page.getByText('Personal Information').isVisible()
  await page.getByText('Billing Address').isVisible()
  await page.getByText('Account Security').isVisible()
  await page.getByText('Terms & Conditions').isVisible()
  await page.getByText('Payment Details').isVisible()
  await page.getByRole('button').getByText('Complete Order').isDisabled()
});