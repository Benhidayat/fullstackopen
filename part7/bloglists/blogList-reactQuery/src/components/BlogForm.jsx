import useCreateBlog from "../features/blogs/useCreateBlog";
import MessageContext from "../context/MessageContext";
import { useContext, useState } from "react";

const BlogForm = ({ blogFormRef }) => {
    // local state
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlogMutation = useCreateBlog();

    const { notify } = useContext(MessageContext);
    
    const createBlog = async (e) => {
        e.preventDefault();
        
        try {
            await createBlogMutation.mutateAsync({ title, author, url });
            blogFormRef.current.toggleVisibility();
            notify(`${title} by ${author} has been added to the list`);
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (error) {
            if (error?.response?.error?.data) {
                notify(error.response.error.data, 'error');
            } else {
                notify('server error','error');
            }
            setTitle('');
            setAuthor('');
            setUrl('');
        }
    };

    return (
        <div>
            <p>Create New</p>
            <form data-testid='blogForm' onSubmit={createBlog} className='blogform'>
                <div>
                    <label>
                        title
                        <input type="text" value={title} onChange={(e) =>  setTitle(e.target.value)} />
                    </label>
                    <label>
                        author
                        <input type="text" value={author} onChange={(e) =>  setAuthor(e.target.value)} />
                    </label>
                    <label>
                        url
                        <input type="text" value={url} onChange={(e) =>  setUrl(e.target.value)} />
                    </label>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm;
