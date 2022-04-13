import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        value: [
            { name: 'Lassi Heikkilä', email: 'lassi@example.com', role: 15 },
            { name: 'Teppo Testaaja', email: 'teppo@example.com', role: 7 },
            { name: 'Tim Tester', email: 'tim@example.com', role: 3 },
        ],
    },
    reducers: {
        setUsers: (state, action) => {
            state.value = action.payload;
        },
        clearUsers: (state) => {
            state.value = [];
        },
    },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users.value;

export default usersSlice.reducer;
