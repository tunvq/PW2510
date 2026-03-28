import { expect, type Locator, type Page } from '@playwright/test';

type TableData = { firstName: string; lastName: string; due: string };
export class TablePage {
    readonly page: Page;
    table1Data: TableData[];

    constructor(page: Page) {
        this.page = page;
        this.table1Data = [];
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    async getTable1Data(){
        const table = this. page.locator('#table1');
        const rows = table.locator('tbody tr');

        this.table1Data = await rows.evaluateAll((rows) => {
            return rows.map((row) => {
                const cells = row.querySelectorAll('td');
                return {
                    firstName: cells[1].innerText,
                    lastName: cells[0].innerText,       
                    due: cells[3].innerText.replace('$', ''),
                };
            });
        });
    }

    async getFullNameOfMaxDuePerson() {
        // find the max due value
        this.table1Data.sort((a, b) => parseFloat(b.due) - parseFloat(a.due));
        const maxDueValue = this.table1Data[0].due;
        const maxDuePerson = this.table1Data.find(person => person.due === maxDueValue);
        const firstName = maxDuePerson?.firstName;
        const lastName = maxDuePerson?.lastName;    
        return `${firstName} ${lastName}`;
    }

    async getFullNamesOfMinDuePersons() {
        // find the min due value
        this.table1Data.sort((a, b) => parseFloat(a.due) - parseFloat(b.due));
        const minDueValue = this.table1Data[0].due;
        const minDuePersons = this.table1Data.filter(person => person.due === minDueValue);
        return minDuePersons.map(person => `${person.firstName} ${person.lastName}`);
    }

}