import { configureStore } from '@reduxjs/toolkit';
import authTokenReducer from './state/Auth';

export default configureStore({
    reducer: {
        authToken: authTokenReducer,
    },
});
