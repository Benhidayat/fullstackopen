import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';

const LoginForm = () => {
    const [visible, setVisible] = useState(false);
    
    const dispatch = useDispatch();

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisiblity = () => {
        setVisible(!visible);
    };

    const handleLogin = async (e) => {
        console.log('handle loggin is clicked');
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        await dispatch(login(username, password));
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
                            <input type="text" name='username' />
                        </label>
                        <label>
                            password
                            <input type="password" name='password' />
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
