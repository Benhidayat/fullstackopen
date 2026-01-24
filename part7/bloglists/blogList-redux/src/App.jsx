import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import BlogList from './components/BlogList';
import { useDispatch, useSelector } from 'react-redux';
import { initialBlogs } from './reducers/blogReducer';
import { logout,persistantLogin } from './reducers/authReducer';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [msg, setMsg] = useState(null);
  // const [notifSelector, setNotifSelector] = useState(true);
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth);

  const blogFormRef = useRef(); 

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await loginService.login({ username, password });
  //     // set the logged user to local storage
  //     window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);
  //     setUsername('');
  //     setPassword('');
  //   } catch (error) {
  //     setMsg('wrong credentials');
  //     setNotifSelector(false);
  //     setUsername('');
  //     setPassword('');
  //     setTimeout(() => {
  //       setMsg(null);
  //     }, 5000);
  //   }
  // };

  // logout
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(initialBlogs());
    }
    fetchBlogs();
  }, [dispatch])

  // persistant user logged in
  useEffect(() => {
    dispatch(persistantLogin());
  },[dispatch]);

  // add new blog
  // const addBlog = async (blogObj) => {
  //   const res = await blogService.create(blogObj);
  //   dispatch(createBlog(res));
  //   setMsg(`${res.title} by ${res.author} added`);
  //   blogFormRef.current.toggeVisibility();
  //   setTimeout(() => {
  //     setMsg(null)
  //   }, 5000);
  // };

  // update a blog
  // const updateTheBlog = async (blogObj) => {
  //   try {
  //     const res = await blogService.updateBlog(blogObj.id, blogObj);
  //     setBlogs(prevBlogs => {
  //       const updated = prevBlogs.map(blog => blog.id === res.id ? res : blog);
  //       return updated;
  //     });
  //     setMsg(`${res.title} has been updated`);
  //     setNotifSelector(true);
  //     setTimeout(() => {
  //       setMsg(null);
  //     }, 5000); 
  //   } catch (error) {
  //     if (error?.response?.status) {
  //       setMsg(error.response.status);
  //       setNotifSelector(false);
  //       setTimeout(() => {
  //         setMsg(null);
  //       }, 5000);
  //     }
  //   }
  // };

  // remove blog
  // const removeBlog = async (blogToDelete) => {
  //   const confirm = window.confirm(`Remove ${blogToDelete.title} by ${blogToDelete.author}?`);
  //   if (confirm){
  //     try {
  //       await blogService.deleteBlog(blogToDelete.id);
  //       const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete.id);
  //       setBlogs(updatedBlogs);
  //       setMsg(`${blogToDelete.title} by ${blogToDelete.author} has been deleted.`);
  //       setNotifSelector(true);
  //       setTimeout(() => {
  //         setMsg(null);
  //       }, 5000);
  //     } catch (error) {
  //       setNotifMsg('failed to delete a blog');
  //       setNotifSelector(false);
  //       setTimeout(() => {
  //         setNotifMsg(null)
  //       }, 5000);
  //     }
  //   }
  // };

  const loginForm = () => {
    return (
      <LoginForm />
    )
  };

  const blogForm = () => {
    return (
      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggable>
    )
  };

  return (
    <div>
      { user && <h2>Blogs</h2>}
      <Notification />
      {!user
      ? (<div>
          <h2>Login to application</h2>
          {loginForm()}
        </div>)
      : <div>
         <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
         </div>
         {blogForm()}
         <BlogList />
      </div>
      }
     
    </div>
  )
}

export default App