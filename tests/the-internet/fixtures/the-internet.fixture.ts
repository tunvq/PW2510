import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckboxesPage } from '../pages/checkbox.page';
import { TablePage } from '../pages/table.page';
import { BrokenImagePage } from '../pages/broken-image.page';
import { DragdropPage } from '../pages/dragdrop.page';

type TheInternetFixtures = {
    loginPage: LoginPage,
    checkboxesPage: CheckboxesPage,
    tablePage: TablePage,
    brokenImagePage: BrokenImagePage,
    dragdropPage: DragdropPage
}

export const test = base.extend<TheInternetFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    checkboxesPage: async ({ page }, use) => {
        const checkboxesPage = new CheckboxesPage(page);
        await use(checkboxesPage);
    },
    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await use(tablePage);
    },
    brokenImagePage: async ({ page }, use) => {
        const brokenImagePage = new BrokenImagePage(page);
        await use(brokenImagePage);
    },
    dragdropPage: async ({ page }, use) => {
        const dragdropPage = new DragdropPage(page);
        await use(dragdropPage);
    }   
});

export { expect } from '@playwright/test';