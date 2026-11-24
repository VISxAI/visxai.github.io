import { expect, test } from '@playwright/test';

// Regression test for https://github.com/VISxAI/visxai.github.io/issues/8:
// the open mobile menu grew taller than the viewport, and because the nav is
// `sticky top-0` the overflowing items could never be scrolled into view.
test.describe('mobile navigation', () => {
	test.use({ viewport: { width: 375, height: 667 } });

	test('every menu item is reachable when the menu is open', async ({ page }) => {
		await page.goto('/');

		await page.getByRole('button', { name: 'Open main menu' }).click();
		const menu = page.locator('#mobile-menu');
		await expect(menu).toBeVisible();

		// Expand the year list, which is what pushes the menu past the viewport.
		await menu.getByRole('button', { name: 'Past Years' }).click();

		// The nav must never be taller than the viewport...
		const viewportHeight = page.viewportSize()!.height;
		const navHeight = await page.locator('nav').evaluate((el) => el.getBoundingClientRect().height);
		expect(navHeight).toBeLessThanOrEqual(viewportHeight + 1);

		// ...and the last item must be scrollable into view inside the menu.
		const lastYear = menu.locator('a').last();
		await lastYear.scrollIntoViewIfNeeded();
		await expect(lastYear).toBeInViewport();
	});

	test('tapping a link closes the menu', async ({ page }) => {
		await page.goto('/');

		await page.getByRole('button', { name: 'Open main menu' }).click();
		const menu = page.locator('#mobile-menu');
		await expect(menu).toBeVisible();

		await menu.getByRole('link', { name: 'Organizers' }).click();
		await expect(menu).toBeHidden();
	});
});
