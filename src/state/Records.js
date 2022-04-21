import { createSlice } from '@reduxjs/toolkit';

export const recordsSlice = createSlice({
    name: 'records',
    initialState: {
        value: [],
    },
    reducers: {
        setRecords: (state, action) => {
            state.value = action.payload;
        },
        clearRecords: (state) => {
            state.value = [];
        },
    },
});

export const { setRecords, clearRecords } = recordsSlice.actions;

export const selectRecords = (state) => state.records.value;

export default recordsSlice.reducer;
