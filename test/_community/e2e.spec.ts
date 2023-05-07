import { Page, expect, test } from '@playwright/test';
import { initPayloadE2E } from '../helpers/configHelpers';

const { beforeAll, describe } = test;
let page: Page;
let serverURL: string;

describe('Admin Panel', () => {
  beforeAll(async ({ browser }) => {
    ({ serverURL } = await initPayloadE2E(__dirname));

    const context = await browser.newContext();
    page = await context.newPage();
  });

  test('loads login view', async () => {
    await page.goto(`${serverURL}/admin%20panel`);
    await expect(page.locator('#field-email')).toBeVisible();
  });
});
