import React from 'react'

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
}) => {
    return (
        <div className='login'>
            <h3>Login to application</h3>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username:
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        password:
                        <input 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
};

export default LoginForm;
