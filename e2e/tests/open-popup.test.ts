import { test, expect } from './popupFixture';

test('popup page', async ({ page, extensionId, context }) => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    await page.getByRole('button', {name: 'Login'}).click();

    const authPage = await context.waitForEvent('page');
    await authPage.waitForURL('https://beta.app.opensauced.pizza/feed');
    await authPage.close();

    await page.reload();
    await expect(page.getByAltText( "OpenSauced logo")).toBeVisible();
});
