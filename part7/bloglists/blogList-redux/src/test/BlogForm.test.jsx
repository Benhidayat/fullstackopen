import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

const mockAddBlog = vi.fn();

describe('BlogForm component testing', () => {
    beforeEach(() => {
        render(<BlogForm addblog={mockAddBlog} />)
    });

    test('renders form initially', () => {
        screen.getByTestId('blogForm');
    });

    test('creates a new blog and calls addBlog prop function', async () => {
        const user = userEvent.setup();

        const titleInput = screen.getByLabelText('title');
        const authorInput = screen.getByLabelText('author');
        const urlInput = screen.getByLabelText('url');
        const submitBtn = screen.getByText('create');

        await user.type(titleInput, 'test blog using vitest');
        await user.type(authorInput, 'budi');
        await user.type(urlInput, 'example.com');
        await user.click(submitBtn);

        const titleResult = mockAddBlog.mock.calls[0][0].title;
        const authorResult = mockAddBlog.mock.calls[0][0].author;
        const urlResult = mockAddBlog.mock.calls[0][0].url;

        expect(mockAddBlog.mock.calls).toHaveLength(1);
        expect(titleResult).toBe('test blog using vitest');
        expect(authorResult).toBe('budi');
        expect(urlResult).toBe('example.com');

    });
});