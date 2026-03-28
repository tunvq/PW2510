import { Page, expect } from '@playwright/test';

export class TodoMvcPage {
    constructor(private page: Page) {}

    async navigateToApp() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }

    async addNewTodo(todoName: string) {
        await this.page.getByPlaceholder('What needs to be done?').fill(todoName);
        await this.page.getByPlaceholder('What needs to be done?').press('Enter');
    }

    async markTodoAsCompleted(todoName: string) {
        await this.page
            .getByRole('listitem')
            .filter({ hasText: todoName })
            .getByTestId('todo-item-toggle')
            .click();
    }

    async deleteTodo(todoName: string) {
        await this.page
            .getByRole('listitem')
            .filter({ hasText: todoName })
            .hover();
        
        await this.page
            .getByRole('listitem')
            .filter({ hasText: todoName })
            .getByRole('button', { name: /delete|destroy|remove|×/ })
            .click();
    }

    async renameTodo(oldName: string, newName: string) {
        // Find the todo item with the old name and double-click its label
        const todoItem = this.page
            .getByTestId('todo-item-label')
            .filter({ hasText: oldName });
        
        await todoItem.dblclick();

        // After dblclick, find the active editing input
        const editInput = this.page.getByRole('listitem').locator('input').first();
        
        await editInput.fill(newName);
        await editInput.press('Enter');
    }

    async verifyTodoExists(todoName: string) {
        await expect(this.page
            .getByRole('listitem')
            .filter({ hasText: todoName }))
            .toBeVisible();
    }

    async verifyTodoNotExists(todoName: string) {
        await expect(this.page
            .getByRole('listitem')
            .filter({ hasText: todoName }))
            .not.toBeVisible();
    }

    async verifyTodoIsCompleted(todoName: string) {
        await expect(this.page.getByRole('listitem')
            .filter({ hasText: todoName })
            .getByTestId('todo-item-toggle'))
            .toBeChecked();
    }

    async getTodoCount() {
        return await this.page.getByTestId('todo-item-label').count();
    }

    async verifyTodoCount(count: number) {
        await expect(this.page.getByTestId('todo-item-label'))
            .toHaveCount(count);
    }
}
