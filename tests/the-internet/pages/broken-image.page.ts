import { expect, type Locator, type Page } from '@playwright/test';

export class BrokenImagePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/broken_images');
    }
    async getAllImageSrcs() {
        const images = this.page.locator('img');
        const allImages = await images.all();
        const imageSrcs = [];       
        for (const image of allImages) {
            const imgSrc = await image.getAttribute('src');
            if (imgSrc) {
                imageSrcs.push(imgSrc);
            }
        }
        return imageSrcs;
    }
}   