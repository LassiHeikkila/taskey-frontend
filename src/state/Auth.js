import { createSlice } from '@reduxjs/toolkit';

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        value: '',
    },
    reducers: {
        setToken: (state, action) => {
            // Redux makes the passed in token an object where the original string value is in "payload" field.
            console.log('setting token: ' + action.payload);
            state.value = action.payload;
        },
        clearToken: (state) => {
            console.log('clearing token which was: ' + state.value);
            state.value = '';
        },
    },
});

export const { setToken, clearToken } = authTokenSlice.actions;

export const selectToken = (state) => state.authToken.value;

export default authTokenSlice.reducer;
