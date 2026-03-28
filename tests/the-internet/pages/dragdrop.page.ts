import { test, expect, Page } from '@playwright/test';

export class DragdropPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }   

    async dragAndDrop() {
        await this.page.goto('https://the-internet.herokuapp.com/drag_and_drop');
        await this.page.locator('#column-a').dragTo(this.page.locator('#column-b'));
        const colA_AfterDrag = await this.page.locator('#column-a').textContent();
        await expect(colA_AfterDrag).toBe('B');
    }
}