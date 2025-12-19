import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe('Blog component tests', () => {
    beforeEach(() => {
        const blog = {
            title: 'blog test',
            author: 'ghost writer',
            url: 'example.com',
            like: 10
        };

        render(<Blog blog={blog} />);
    });

    it('display blog\'s title and author only', () => {
        screen.getByTestId('hide');
    });

    it('expands the blog info after clicking show button', async () => {
        const user = userEvent.setup();
        const showButton = screen.getByText('show');
        await user.click(showButton);

        const element = screen.getByTestId('show');
        expect(element).toBeVisible();
    });
});