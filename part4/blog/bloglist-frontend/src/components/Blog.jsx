import { useState } from "react"

const Blog = ({blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog?.likes);

  const hideWHenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const increaseLikes = () => {
     console.log(likes);
    const updatedLikes = likes + 1;
    console.log('updatedLikes', updatedLikes)
    setLikes(updatedLikes);
    const blogObj = {...blog, likes: updatedLikes };
    console.log('blogobj inside blog', blogObj);
    updateBlog(blogObj);
  };

  return (
    <div>
      <div style={hideWHenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url} </p>
        <p>{blog.likes} <button onClick={increaseLikes}>like</button> </p>
        <p>{blog?.user?.name}</p>
      </div>
    </div>  
  )
}

export default Blog