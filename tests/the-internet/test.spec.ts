import {test,expect} from '@playwright/test'
import { link } from 'node:fs';

test('verify status code links', async ({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/status_codes')

    await page.getByRole('link').filter({ hasText: '200' }).click();
    
    // await page.getByRole('link', { name: '200' }).click();
    expect(page.url()).toContain('status_codes/200');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '301' }).click();
    expect(page.url()).toContain('status_codes/301');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '404' }).click();
    expect(page.url()).toContain('status_codes/404');
    await page.getByRole('link', { name: 'here' }).click();

    await page.getByRole('link', { name: '500' }).click();
    expect(page.url()).toContain('status_codes/500');
    await page.getByRole('link', { name: 'here' }).click();
});;