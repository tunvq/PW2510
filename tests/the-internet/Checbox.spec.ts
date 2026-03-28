import { test, expect } from './fixtures/the-internet.fixture';

test('verify able to check the checkbox', async ({checkboxesPage}) =>{
    await checkboxesPage.goto();

    await checkboxesPage.checkFirstCheckbox(); // accessibility role
    await checkboxesPage.checkSecondCheckbox(); // accessibility role

    expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);
    expect(await checkboxesPage.isSecondCheckboxChecked()).toBe(true);
});