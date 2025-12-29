import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        createFilter(state, action) {
            const filter = action.payload
            return state = filter;
        }
    }
});


export const { createFilter } = filterSlice.actions;
export default filterSlice.reducer;