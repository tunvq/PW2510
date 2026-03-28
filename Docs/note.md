# Flow apply page object model

1. create linear script <all in one file>

2. create page class under [pages](../tests/the-internet/pages/)

3. file name with suffix `page.ts`

4. page class content

```ts
import { expect, type Locator, type Page } from '@playwright/test';

readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/checkboxes');
    }
```

5. register into [fixture file](../tests/the-internet/fixtures/the-internet.fixture.ts)

```ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckboxesPage } from '../pages/checkboxes.page';
import { TablePage } from '../pages/table.page';
import { HyperlinkPage } from '../pages/hyperlink.page';
import { DropdownPage } from '../pages/dropdown.page';
import { FruitesPage } from '../pages/fruites.page';

type TheInternetFixtures = {
    loginPage: LoginPage,
    checkboxesPage: CheckboxesPage,
    tablePage: TablePage,
    hyperlinkPage: HyperlinkPage,
    dropdownPage: DropdownPage,
    fruitesPage: FruitesPage
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
    hyperlinkPage: async ({ page }, use) => {
        const hyperlinkPage = new HyperlinkPage(page);
        await use(hyperlinkPage);
    },
    dropdownPage: async ({ page }, use) => {
        const dropdownPage = new DropdownPage(page);
        await use(dropdownPage);    
    },
    fruitesPage: async ({ page }, use) => {
        const fruitesPage = new FruitesPage(page);
        await use(fruitesPage);
    }
});

export { expect } from '@playwright/test';
```

Accepted Criteria:
- test case run pass.
- test case not contains locator.