import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notifications from './components/Notifications';
import Togglable from './components/Togglable';

const App = () => {
  // state
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notifMsg, setNotifMsg] = useState(null);
  const [notifSelector, setNotifSelector] = useState(true);

  // ref hook
  const blogFormRef = useRef();

  // render all blogs at the first render
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // make login persistance event after reloading the page
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // create new blogs
  const addNewBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility();
    const res = await blogService.createBlog(blogObj);
    setBlogs(blogs.concat(res));
    setNotifMsg(`${res.title} by ${res.author} has been added to the list`);
    setNotifSelector(true);
    setTimeout(() => {
      setNotifMsg('');
    }, 5000);
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({username, password});

      // save login information to local storage for persistance login
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      // set token for jwt
      blogService.setToken(user.token);
      setUser(user);
      setNotifMsg(`${user.name} is logged`);
      setNotifSelector(true);
      setTimeout(() => {
        setNotifMsg(null);
      }, 5000);
      setUsername('');
      setPassword('');
    } catch (error) {
      if (!error?.response) {
        setNotifMsg('No server response');
        setNotifSelector(false);
        setTimeout(() => {
          setNotifMsg(null);
        }, 5000);
      } else if (error.response?.status === 400) {
        setNotifMsg('username and password are required');
        setNotifSelector(false);
        setTimeout(() => {
          setNotifMsg(null);
        }, 5000);
      } else if ( error.response?.status === 401) {
        setNotifMsg('Wrong credentials');
        setNotifSelector(false);
        setTimeout(() => {
          setNotifMsg(null);
        }, 5000);
      } else {
        setNotifMsg('login failed');
        setNotifSelector(false);
        setTimeout(() => {
          setNotifMsg(null);
        }, 5000);
      }

    }
  }

  // logout
  const handleLogout = () => {
    window.localStorage.clear('loggedUser');
    blogService.setToken(null);
    setUser(null);
  };

  // blog form
  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addNewBlog} />
      </Togglable>
    )
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notifications message={notifMsg} notifSelector={notifSelector} />

      {user
        ?  <div>
            <div className='logged'>
              <p>{user.name} logged in</p>
              <button onClick={handleLogout}>logout</button>
            </div>
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        : <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />}
    </div>
  )
}

export default App