const { beforeEach, describe, expect, test } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
    beforeEach( async ({ page, request }) => {
        await request.post('http://localhost:3002/api/testing/reset');
        await request.post('http://localhost:3002/api/users', {
            data: {
                name: 'budi',
                username: 'budi',
                password: 'abcd'
            }
        });
        await request.post('http://localhost:3002/api/users', {
            data: {
                name: 'ani',
                username: 'ani',
                password: 'abcd'
            }
        });

        await page.goto('http://localhost:5173');
    });

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByText('Login to application')).toBeVisible();
        await expect(page.getByLabel('username')).toBeVisible();
        await expect(page.getByLabel('password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    });

    describe('login', () => {
        test('login succeeds with correct credentials', async ({ page }) => {
            loginWith(page, 'budi', 'abcd');
            await expect(page.getByText('budi logged in')).toBeVisible();
        });

        test('login fails with wrong credentials', async ({ page }) => {
            loginWith(page, 'budi', 'aabb');
            await expect(page.getByText('wrong credentials')).toBeVisible();
        });
    });

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            loginWith(page, 'budi', 'abcd');
        });

        test.only('a new blog can be created', async ({ page }) => {
            createBlog(page, 'blog created by playwright', 'budi', 'example.com');

            await expect(page.getByText('blog created by playwright by budi has been added to the list')).toBeVisible();
        });

        describe('and a blog exist', () => {
            beforeEach(async ({ page }) => {
                createBlog(page, 'need the likes', 'budi', 'example.com');
            });

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'show' }).click();
                await page.getByRole('button', { name: 'like' }).click();
                
                await expect(page.getByText('1', { exact: false })).toBeVisible();
            });

            test('a blog can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'show'}).click();

                page.on('dialog', async dialog => {
                    await dialog.message('Remove blog need the likes by budi?');
                    await dialog.accept();
                });
                
                await page.getByRole('button', { name: 'remove' }).click();
                await expect(page.getByText('need the likes by budi has been deleted.')).toBeVisible();

            });

            test('users who did not add the blog can not see the remove button', async ({ page }) => {
                await page.getByRole('button', { name: 'logout' }).click();

                await loginWith(page, 'ani', 'abcd');
                await page.getByRole('button', { name: 'show' }).click();

                expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible();
            });
        });

        describe('multiple blogs exist', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'first blog', 'budi', 'example.com');
                await createBlog(page, 'second blog', 'budi', 'example.com');
                await createBlog(page, 'third blog', 'budi', 'example.com');
                
            });
            test('blogs are arranged according to number of likes', async ({ page }) => {
                const showBtns = await page.getByRole('button', { name: 'show'});
                await showBtns.first().click();
                await showBtns.nth(1).click();
                await showBtns.last().click();

                const likeBtns = await page.getByRole('button', { name: 'like'});
                await likeBtns.last().click();
                await likeBtns.first().click();
                await likeBtns.first().click();

                const blogs = await page.getByTestId('blog');

                await expect(blogs.first()).toContainText('second blog budi');
                await expect(blogs.nth(1)).toContainText('third blog budi');
                await expect(blogs.last()).toContainText('first blog budi');
            });
        });
    })
});