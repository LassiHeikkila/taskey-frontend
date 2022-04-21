import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        value: [],
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
