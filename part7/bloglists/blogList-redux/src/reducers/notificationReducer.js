import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        message: null,
        type: null,
    },
    reducers: {
        createNotification(state, action) {
            state.message = action.payload.message;
            state.type = action.payload.type;
            console.log('message', state.message);
        },
        removeNotification(state, action) {
            state.message = null;
            state.type = null;
        }
    }
});

const { createNotification, removeNotification} = notificationSlice.actions;

export const setNotification = (message, type = 'success', second = 5) => {
    return async (dispatch) => {
        dispatch(createNotification({ message, type }));
        setTimeout(() => {
            dispatch(removeNotification());
        }, second * 1000);
    }
};

export default notificationSlice.reducer;