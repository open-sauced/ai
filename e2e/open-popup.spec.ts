import { test, expect } from './popupFixture';

test('popup page', async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/index.html`);
    expect(page.locator('body')).toBeTruthy();
});
