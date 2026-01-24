import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

const mockUpdateLikes = vi.fn();

describe('Blog component test', () => {
    beforeEach(() => {
        const blog = {
            title: 'blog for testing',
            author: 'ghost',
            url: 'example.com',
            likes: 100
        }

        render(<Blog blog={blog} updateBlog={mockUpdateLikes}/>)
    });

    it('display blog\'s title and author only', () => {
       const element = screen.getByTestId('hide');
       screen.debug(element);

       expect(element).toBeVisible();
    });

    it('displays likes and url after clicking show button', async () => {
        const user = userEvent.setup();
        const button = screen.getByText('show');
        await user.click(button);

        const element = screen.getByTestId('show');
        screen.debug(element);
        expect(element).toBeVisible();
    });

    test('clicks on update button twice', async () => {
        const user = userEvent.setup();
        const likeButton = screen.getByText('like');
        await user.click(likeButton);
        await user.click(likeButton);

        expect(mockUpdateLikes.mock.calls).toHaveLength(2);
    });

});