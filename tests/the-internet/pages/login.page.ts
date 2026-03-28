import { expect, type Locator, type Page } from "@playwright/test";

//factory design pattern
export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {  
        await this.page.goto("https://the-internet.herokuapp.com/login");
    }

    async login(username: string, password: string) {              
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();

    }
}