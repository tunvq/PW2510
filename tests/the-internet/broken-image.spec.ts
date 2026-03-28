import {test,expect} from '@playwright/test';

test('verify broken image', async ({page}) => {
    const images = page.locator('img');
    const allImages = await images.all();   
});     