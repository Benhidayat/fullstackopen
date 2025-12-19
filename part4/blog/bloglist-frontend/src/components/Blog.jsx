import { useState } from "react"

const Blog = ({blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog?.likes);

  const hideWHenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const increaseLikes = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const blogObj = {...blog, likes: updatedLikes };
    updateBlog(blogObj);
  };

  const handleRemove = () => {
    removeBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div style={hideWHenVisible} data-testid='hide'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} data-testid='show'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url} </p>
        <p>{blog.likes} <button onClick={increaseLikes}>like</button> </p>
        <p>{blog?.user?.name}</p>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>  
  )
}

export default Blog