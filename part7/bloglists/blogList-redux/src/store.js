import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from './reducers/notificationReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notifications: notificationReducer,
        auth: authReducer
    }
});

export default store;