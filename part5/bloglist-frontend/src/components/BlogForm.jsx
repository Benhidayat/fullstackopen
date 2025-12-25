import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addNewBlog = async (e) => {
        e.preventDefault();
        
        createBlog({
            title,
            author,
            url
        });
        setTitle('');
        setAuthor('');
        setUrl('');

    };

    return (
        <div className='blogform'>
            <h3>Create new</h3>
            <form onSubmit={addNewBlog} data-testid='form'>
                <div>
                    <label>
                        title
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        author
                        <input 
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </label>
                    <label>
                        url
                        <input 
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
};

export default BlogForm;
