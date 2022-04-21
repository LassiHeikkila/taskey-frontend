import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.value = action.payload;
        },
        clearTasks: (state) => {
            state.value = [];
        },
    },
});

export const { setTasks, clearTasks } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.value;

export default tasksSlice.reducer;
