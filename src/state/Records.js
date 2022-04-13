import { createSlice } from '@reduxjs/toolkit';

export const recordsSlice = createSlice({
    name: 'records',
    initialState: {
        value: [
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:19:00.000+03:00', status: 0, output: 'humidity is 100%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:20:00.000+03:00', status: 0, output: 'humidity is 96%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:21:00.000+03:00', status: 0, output: 'humidity is 92%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:22:00.000+03:00', status: 0, output: 'humidity is 75%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:23:00.000+03:00', status: 0, output: 'humidity is 100%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:24:00.000+03:00', status: 0, output: 'humidity is 99%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:25:00.000+03:00', status: 0, output: 'humidity is 98%' },
            { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:26:00.000+03:00', status: 0, output: 'humidity is 97%' },
        ],
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
