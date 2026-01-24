import { useDispatch } from "react-redux";
import { appendBlog } from "../reducers/blogReducer";

const BlogForm = ({ blogFormRef }) => {
    const dispatch = useDispatch();
    
    const createBlog = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.author.value;
        const url = e.target.url.value;
        await dispatch(appendBlog(title, author, url));
        blogFormRef.current.toggleVisibility();
    };

    return (
        <div>
            <p>Create New</p>
            <form data-testid='blogForm' onSubmit={createBlog} className='blogform'>
                <div>
                    <label>
                        title
                        <input type="text" name='title' />
                    </label>
                    <label>
                        author
                        <input type="text" name='author' />
                    </label>
                    <label>
                        url
                        <input type="text" name='url' />
                    </label>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm;
