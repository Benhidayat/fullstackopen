import { createSlice } from "@reduxjs/toolkit";

const initialState = 'render here notification...';

const notifSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload;
        },
        removeNotif(state, action) {
            return initialState;
        }
    }
});


const { createNotification, removeNotif } = notifSlice.actions;

export const setNotification = (content, time) => {
    return (dispatch) => {
        dispatch(createNotification(content));
        setTimeout(() => {
            dispatch(removeNotif());
        }, time * 1000);
    }
};

export default notifSlice.reducer;