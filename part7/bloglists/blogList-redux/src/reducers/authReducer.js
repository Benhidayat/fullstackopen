import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNotification } from "./notificationReducer";

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        removeUser(state, action) {
            return initialState;
        }
    }
});

const { setUser, removeUser } = authSlice.actions;

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({ username, password });
            
            // set persistent login
            window.localStorage.setItem('loggedUser', JSON.stringify(user));
    
            blogService.setToken(user.token);
            dispatch(setUser(user));
        } catch (error) {
            dispatch(setNotification('wrong credentials', 'error'));
        }
    };
};

export const persistantLogin = () => {
    return (dispatch) => {
        const loggedUser = window.localStorage.getItem('loggedUser');

        if (loggedUser) {
            const user = JSON.parse(loggedUser);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedUser');
        blogService.setToken(null);
        dispatch(removeUser());
    };
};

export default authSlice.reducer;