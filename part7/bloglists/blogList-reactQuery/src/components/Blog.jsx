import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import MessageContext from "../context/MessageContext";
import useDeleteBlog from "../features/blogs/useDeleteBlog";
import useUpdateBlog from "../features/blogs/useUpdateBlog";

const Blog = ({ blog }) => {
  // local state
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog?.likes);

  // usecontext
  const { user } = useContext(AuthContext);
  const { notify } = useContext(MessageContext);

  const deleteBlogMutation = useDeleteBlog();
  const updateBlogMutation = useUpdateBlog();

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggeVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const blogObj = {
      ...blog,
      likes: updatedLikes
    }
    await updateBlogMutation.mutateAsync({ id: blog.id, blogObj});
    notify(`${blog.title} has been updated`)

  };


  const handleRemove = async () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`);
    if (confirm) {
      await deleteBlogMutation.mutateAsync(blog.id);
      notify(`${blog.title} by ${blog.author} has been deleted`);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} data-testid='hide'>
        {blog.title} {blog.author} <button onClick={toggeVisibility}>show</button>
      </div>
      <div style={showWhenVisible} data-testid='show'>
        {blog.title} {blog.author} <button onClick={toggeVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog?.user?.name}</p>
        <button style={{ display: user.name === blog.user.name ? '' : 'none' }} onClick={handleRemove}>remove</button>
      </div>
    </div>  
  )
}

export default Blog