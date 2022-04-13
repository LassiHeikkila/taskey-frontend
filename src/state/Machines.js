import { createSlice } from '@reduxjs/toolkit';

export const machinesSlice = createSlice({
    name: 'machines',
    initialState: {
        value: [
            { name: 'raspberrypi-3B-01', description: 'raspberry pi connected to lights', os: 'Linux', arch: 'arm32' },
            { name: 'raspberrypi-zeroW-05', description: 'raspberry pi zero w connected to thermostat', os: 'Linux', arch: 'arm32' }
        ],
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
