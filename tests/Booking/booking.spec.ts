import { test, expect } from '@playwright/test';

/**
 * Navigate https://www.vietnamairlines.com/vn/vi/
 * Chon depart la SGN -> HAN, Ngay di 25/3/2026 -> 31/3/2026
 * Verify  từ: SGN đến là HAN, ngày đi là 25/3/2026, ngày về là 31/3/2026
 */

test.skip('Book flight from SGN to HAN', async ({ page }) => {
    // Register cookie handler BEFORE navigation
    await page.addLocatorHandler(
        page.getByRole('button', { name: 'Chấp thuận tất cả Cookie' }),
        async () => {
            await page.getByRole('button', { name: 'Chấp thuận tất cả Cookie' }).click();
            await page.locator('#onetrust-consent-sdk').waitFor({ state: 'hidden' });
        }
    );

    // Navigate to Vietnam Airlines website
    await page.goto('https://www.vietnamairlines.com/vn/vi/');
   
  await page.getByRole('button', { name: 'Chọn điểm đi' }).click();
  await page.getByText('Tp. Hồ Chí Minh', { exact: true }).click();
//   await page.getByRole('button', { name: 'Chọn điểm đến' }).click();
//   await page.getByText('Hà Nội').first().click();
//   await page.getByRole('button', { name: '21 3.9Tr' }).click();
//   await page.getByRole('button', { name: '21 3.9Tr' }).click();
});