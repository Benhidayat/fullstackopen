import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyBlog, deleteBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog?.likes);

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);

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
    await dispatch(modifyBlog(blogObj));
  };

  const handleRemove = async () => {
    console.log('handle remove clicked')
    await dispatch(deleteBlog(blog.id));
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