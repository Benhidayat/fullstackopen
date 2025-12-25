import BlogForm from "./BlogForm";
import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";

let mockCreateBlog = vi.fn();

describe(' BlogForm component testing', () => {
    beforeEach(() => {
        render(<BlogForm createBlog={mockCreateBlog} />)
    });

    it('renders form initially', () => {
        screen.getByTestId('form');
    });

    it('create new blog and calls createBlog prop', async () => {
        const user = userEvent.setup();

        const titleInput = screen.getByLabelText('title');
        const authorInput = screen.getByLabelText('author');
        const urlInput = screen.getByLabelText('url');

        const createBtn = screen.getByText('create');

        await user.type(titleInput, 'testing form' );
        await user.type(authorInput, 'ghost');
        await user.type(urlInput, 'test.com');

        await user.click(createBtn);

        const titleResult = mockCreateBlog.mock.calls[0][0].title;
        const authorResult = mockCreateBlog.mock.calls[0][0].author;
        const urlResult = mockCreateBlog.mock.calls[0][0].url;

        expect(mockCreateBlog.mock.calls).toHaveLength(1);
        expect(titleResult).toBe('testing form');
        expect(authorResult).toBe('ghost');
        expect(urlResult).toBe('test.com');

    });
});