import { createSlice } from '@reduxjs/toolkit';

export const schedulesSlice = createSlice({
    name: 'schedules',
    initialState: {
        value: [
            {
                machineName: 'raspberrypi-3B-01',
                singleshot: [],
                periodically: [
                    { every: '2h30m', taskID: 'toggle-lights' },
                ],
                cron: [],
            },
            {
                machineName: 'raspberrypi-zeroW-05',
                singleshot: [],
                periodically: [],
                cron: [
                    { cron: '0 * * * * * *', taskID: 'record-soil-humidity' },
                    { cron: '5 * * * * * *', taskID: 'record-air-humidity' },
                ],
            },
        ],
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
