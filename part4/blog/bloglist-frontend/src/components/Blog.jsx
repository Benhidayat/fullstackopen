import { useState } from "react"

const Blog = ({blog, user, updateBlog, removeBlog }) => {
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


  console.log('a blog details', blog);
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
    <div data-testid='blog' style={blogStyle}>
      <div style={hideWHenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url} </p>
        <p>{blog.likes}<button onClick={increaseLikes}>like</button> </p>
        <p>{blog?.user?.name}</p>
        <button style={{ display: blog.user.name === user.name ? 'block' : 'none'}} onClick={handleRemove}>remove</button>
      </div>
    </div>  
  )
}

export default Blog