import { test, expect } from './fixtures/the-internet.fixture';

const dataset = [
    {username: 'tomsmith', password: 'SuperSecretPassword!', message: 'You logged into a secure area!'},
    {username: 'tomsmith1', password: 'SuperSecretPassword!', message: 'Your username is invalid!'},
    {username: 'tomsmith', password: 'SuperSecretPassword!1', message: 'Your password is invalid!'},
    {username: '', password: '', message: 'Your username is invalid!'},
]


dataset.forEach(( {username, password, message} ) => {
test(`login with ${username} and ${password} then ${message} should be visible`, async({ loginPage, page }) => {

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page.getByText(message)).toBeVisible();
});
});      