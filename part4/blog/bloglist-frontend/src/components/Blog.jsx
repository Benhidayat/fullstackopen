import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const hideWHenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWHenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
      </div>
    </div>  
  )
}

export default Blog