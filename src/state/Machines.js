import { createSlice } from '@reduxjs/toolkit';

export const machinesSlice = createSlice({
    name: 'machines',
    initialState: {
        value: [],
    },
    reducers: {
        setMachines: (state, action) => {
            state.value = action.payload;
        },
        clearMachines: (state) => {
            state.value = [];
        },
    },
});

export const { setMachines, clearMachines } = machinesSlice.actions;

export const selectMachines = (state) => state.machines.value;

export default machinesSlice.reducer;
