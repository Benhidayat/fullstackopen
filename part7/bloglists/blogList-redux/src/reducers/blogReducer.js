import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            state = action.payload;
            return state;
        },
        createBlog(state, action) {
            state.push(action.payload);
        },
        updateBlog(state, action) {
          const updatedBlog = action.payload;
          return state.map(blog => blog. id === updatedBlog.id ? updatedBlog : blog);
        },
        removeBlog(state, action) {
          const id  = action.payload;
          return state.filter(blog => blog.id !== id);
        }
    }
});


const { createBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions;

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url });
      dispatch(createBlog(newBlog));
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added`));
    } catch (error) {
      dispatch(setNotification(error?.response?.status || 'adding new blog failed', 'error'));
    }
  };
};

export const modifyBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, blog);
      console.log('updatedblog', updatedBlog)
      dispatch(updateBlog(updatedBlog));
      dispatch(setNotification(`${updatedBlog.title} has been updated`));
    } catch (error) {
      dispatch(setNotification(error?.response?.status || 'update failed', 'error'));
    }
  }
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(removeBlog(id));
  };
};


export default blogSlice.reducer;