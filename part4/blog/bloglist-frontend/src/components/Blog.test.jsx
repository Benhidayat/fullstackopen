import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const mockUpdateBlog = vi.fn();
const mockRemoveBlog = vi.fn();

describe('Blog component tests', () => {
    beforeEach(() => {
        const blog = {
            title: 'blog test',
            author: 'ghost writer',
            url: 'example.com',
            likes: 10
        };


        render(<Blog blog={blog} updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} />);
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

    it('calls even handler click twice', async () => {
        const user = userEvent.setup();
        const likeBtn = screen.getByText('like');
        
        for (let i = 0; i < 2; i++) {
            await user.click(likeBtn);
        }
        
        expect(mockUpdateBlog.mock.calls).toHaveLength(2);
    });
});