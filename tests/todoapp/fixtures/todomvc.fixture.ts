import { test as base } from '@playwright/test';
import { TodoMvcPage } from '../pages/todomvc.page';

type TodoMvcFixtures = {
    todoMvcPage: TodoMvcPage
}

export const test = base.extend<TodoMvcFixtures>({
    todoMvcPage: async ({ page }, use) => {
        const todoMvcPage = new TodoMvcPage(page);
        await use(todoMvcPage);
    }
});

export { expect } from '@playwright/test';
