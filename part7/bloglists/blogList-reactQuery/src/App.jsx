import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import BlogList from './components/BlogList';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import blogService from './services/blogs';

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  const blogFormRef = useRef(); 

  // const {data: user } = useQuery({
  //   queryKey: ['user'],
  //   enabled: false
  // });

  // console.log('user app', user);

  // persistant login
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }

  }, []);

  const handleLogout = () => {
    window.localStorage.clear('loggedUser');
    setUser(null);
    blogService.setToken(null);
  };

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
       ? <div>
           <h2>Login to application</h2>
           {loginForm()}
         </div>
       : <div>
          <div>
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