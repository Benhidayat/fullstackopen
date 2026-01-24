const { beforeEach, describe ,expect , test } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        // reset the database for testing
        await request.post('/api/testing/reset');
        // create user for testing
        await request.post('/api/users', {
            data: {
                name: 'budi',
                username: 'budi',
                password: 'abcd'
            }
        });

        // second user for testing
        await request.post('/api/users', {
            data: {
                name: 'ani',
                username: 'ani',
                password: 'abcd'
            }
        });

        await page.goto('/');
    });

    test('login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click();
        await expect(page.getByLabel('username')).toBeVisible();
        await expect(page.getByLabel('password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible();
    });

    describe('login', () => {
        test('login succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'budi', 'abcd');

            await expect(page.getByText( 'budi logged in')).toBeVisible();
        });

        test('fails with incorrect credentials', async ({ page }) => {
            await loginWith(page, 'budi', 'aabb');

            await expect(page.getByText('wrong credentials')).toBeVisible();
        });
    });

    describe('when a user logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'budi', 'abcd');
        }); 

        test('new blog can be added', async ({ page }) => {
            createBlog(page, 'a blog created in playwright', 'budi', 'example.com');

            await expect(page.getByTestId('hide')).toBeVisible();
        });

        describe('and a blog exist', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'a blog exist', 'budi', 'example.com');
            });

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'show' }).click();
                await page.getByRole('button', { name: 'like' }).click();

                await expect(page.getByText('a blog exist has been updated'))
                await expect(page.getByText('1', { exact: false })).toBeVisible();
            });

            test('a blog can be deleted by the user who added it', async ({ page }) => {
                await page.getByRole('button', { name: 'show' }).click();

                page.on('dialog', async dialog => {
                    await dialog.message('Remove a blog exist by budi?');
                    await dialog.accept();
                });

                await page.getByRole('button', { name: 'remove' }).click();

                await expect(page.getByText('a blog exist by budi has been deleted.')).toBeVisible();
            });

            test('a blog can\'t be deleted by user the who\'s not added it', async ({ page }) => {
                await page.getByRole('button', { name: 'logout' }).click();
                await loginWith(page, 'ani', 'abcd');
                await page.getByRole('button', { name: 'show' }).click();
                await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible();
            });
        });
    });
});
