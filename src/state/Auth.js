import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        token: '',
        user: '',
        org: '',
        role: 0,
    },
    reducers: {
        setToken: (state, action) => {
            // Redux makes the passed in token an object where the original string value is in "payload" field.
            state.token = action.payload;

            const dec = jwt_decode(action.payload);

            // JWT contents are defined here: https://github.com/LassiHeikkila/taskey/blob/main/internal/auth/jwt.go#L26-L32
            if (dec.user) {
                state.user = dec.user;
            }

            if (dec.organization) {
                state.org = dec.organization;
            }

            if (dec.role) {
                state.role = dec.role;
            }
        },
        clearToken: (state) => {
            state.token = '';
            state.user = '';
            state.org = '';
            state.role = 0;
        },
    },
});

export const { setToken, clearToken } = authTokenSlice.actions;

export const selectToken = (state) => state.authToken.token;
export const selectUser = (state) => state.authToken.user;
export const selectOrg = (state) => state.authToken.org;
export const selectRole = (state) => state.authToken.role;

export default authTokenSlice.reducer;
