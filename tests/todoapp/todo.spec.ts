import { test, expect } from './fixtures/todomvc.fixture';

// TC11: Page Object Model - Todo MVC - Verify user able create a new todo
test("TC11: verify add new todo successfully", async ({ todoMvcPage }) => {
    await todoMvcPage.navigateToApp();

    await todoMvcPage.addNewTodo('Buy milk');
    await todoMvcPage.addNewTodo('Buy groceries');

    await todoMvcPage.verifyTodoCount(2);
    await todoMvcPage.verifyTodoExists('Buy milk');
    await todoMvcPage.verifyTodoExists('Buy groceries');
});

// TC12: Page Object Model - Todo MVC - Verify user able mark complete a todo
test("TC12: verify mark a todo as completed", async ({ todoMvcPage }) => {
    await todoMvcPage.navigateToApp();

    await todoMvcPage.addNewTodo('Buy milk');
    await todoMvcPage.addNewTodo('Buy groceries');

    await todoMvcPage.markTodoAsCompleted('Buy milk');

    await todoMvcPage.verifyTodoIsCompleted('Buy milk');
});

// TC13: Page Object Model - Todo MVC - Verify user able delete a todo
test("TC13: verify delete a todo successfully", async ({ todoMvcPage }) => {
    await todoMvcPage.navigateToApp();

    await todoMvcPage.addNewTodo('Buy milk');
    await todoMvcPage.addNewTodo('Buy groceries');

    await todoMvcPage.deleteTodo('Buy milk');

    await todoMvcPage.verifyTodoCount(1);
    await todoMvcPage.verifyTodoNotExists('Buy milk');
    await todoMvcPage.verifyTodoExists('Buy groceries');
});

// TC14: Page Object Model - Todo MVC - Verify user able update a todo name
test("TC14: verify rename a todo successfully", async ({ todoMvcPage }) => {
    await todoMvcPage.navigateToApp();

    await todoMvcPage.addNewTodo('Buy milk');

    await todoMvcPage.renameTodo('Buy milk', 'Buy organic milk');

    await todoMvcPage.verifyTodoExists('Buy organic milk');
    await todoMvcPage.verifyTodoNotExists('Buy milk');
    await todoMvcPage.verifyTodoCount(1);
});