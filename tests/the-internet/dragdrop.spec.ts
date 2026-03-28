import { expect, test } from './fixtures/the-internet.fixture';


test('drag and drop', async ({ dragdropPage }) => {
    // Go to the drag and drop page
    await dragdropPage.dragAndDrop();
});
