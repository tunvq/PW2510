import {test,expect} from './fixtures/the-internet.fixture';

test.describe('table1 tests', () => {
    test.beforeEach(async ({ tablePage }) => {
        await tablePage.goto();
        await tablePage.getTable1Data();
    });

    test('verify fullname of max due person', async ({ tablePage }) => {
        expect(await tablePage.getFullNameOfMaxDuePerson()).toBe('Jason Doe');
    });

    test('verify min due person full name', async ({ tablePage }) => {
        expect(await tablePage.getFullNamesOfMinDuePersons()).toEqual([ 'John Smith','Tim Conway']);
    }); 
});