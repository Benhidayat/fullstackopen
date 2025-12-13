import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      setUsername('');
      setPassword('');
    } catch (error) {
      setErrMsg('Wrong credentials');
      setTimeout(() => {
        setErrMsg(null);
      }, 5000);

    }
  }

  // logout
  const handleLogout = () => {
    window.localStorage.clear('loggedUser');
    blogService.setToken(null);
    setUser(null);
  };

  if (user === null) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Notification message={errMsg} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App