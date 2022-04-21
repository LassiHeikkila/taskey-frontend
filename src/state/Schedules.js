import { createSlice } from '@reduxjs/toolkit';

export const schedulesSlice = createSlice({
    name: 'schedules',
    initialState: {
        value: [],
    },
    reducers: {
        setSchedules: (state, action) => {
            state.value = action.payload;
        },
        clearSchedules: (state) => {
            state.value = [];
        },
    },
});

export const { setSchedules, clearSchedules } = schedulesSlice.actions;

export const selectSchedules = (state) => state.schedules.value;

export default schedulesSlice.reducer;
