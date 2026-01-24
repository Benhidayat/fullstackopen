import { useContext, useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import AuthContext from '../context/AuthContext';
import MessageContext from '../context/MessageContext';

const LoginForm = () => {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const { setUser } = useContext(AuthContext);

    const { notify } = useContext(MessageContext);

    const toggleVisiblity = () => {
        setVisible(!visible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            blogService.setToken(user.token);
            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            setUsername('');
            setPassword('');
        } catch (error) {
            if (error?.response?.data?.error) {
                notify(error.response.data.error, 'error');
            } else {
                notify('server error', 'error');
            }
        }
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisiblity}>login</button>
            </div>
            <div style={showWhenVisible}>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>
                            username
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            password
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button type='submit'>login</button>
                </form>
                <button onClick={toggleVisiblity}>cancel</button>
            </div>
        </div>
    )
};

export default LoginForm;
