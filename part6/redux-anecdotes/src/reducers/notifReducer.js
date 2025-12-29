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

export const { createNotification, removeNotif } = notifSlice.actions;
export default notifSlice.reducer;