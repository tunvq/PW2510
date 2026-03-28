import {test, expect} from '@playwright/test';

const bmiTestData = [
    { age: '25', gender: 'Male', height: '180', weight: '75', expectedBMI: '23.1', expectedClassification: 'Normal', description: 'Normal weight male' },
    { age: '35', gender: 'Female', height: '170', weight: '50', expectedBMI: '17.3', expectedClassification: 'Mild Thinness', description: 'Underweight female' },
    { age: '45', gender: 'Male', height: '175', weight: '90', expectedBMI: '29.4', expectedClassification: 'Overweight', description: 'Overweight male' },
    { age: '55', gender: 'Female', height: '160', weight: '100', expectedBMI: '39.1', expectedClassification: 'Obese Class II', description: 'Obese female' },
    { age: '65', gender: 'Male', height: '185', weight: '80', expectedBMI: '23.4', expectedClassification: 'Normal', description: 'Normal weight tall male' },
];

bmiTestData.forEach(({ age, gender, height, weight, expectedBMI, expectedClassification, description }) => {
    test(`BMI calculation for ${description} - age: ${age}, height: ${height}cm, weight: ${weight}kg, expected BMI: ${expectedBMI} (${expectedClassification})`, async ({ page }) => {
        await page.goto('https://www.calculator.net/bmi-calculator.html');
        await page.getByRole('link', { name: 'Metric Units' }).click();

        await page.locator('#cage').fill(age);
        
        // Select the gender radio button (Male is default, only click if Female)
        if (gender === 'Female') {
            await page.locator('text=Female').click();
        }
        
        await page.locator('#cheightmeter').fill(height);
        await page.locator('#ckg').fill(weight);
        await page.getByRole('button', { name: 'Calculate' }).click();

        await expect(page.getByText(`BMI = ${expectedBMI}`, { exact: true })).toBeVisible();
        await expect(page.locator('font').getByText(expectedClassification)).toBeVisible();
    });
});