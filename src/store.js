import { configureStore } from '@reduxjs/toolkit';
import authTokenReducer from './state/Auth';
import machinesReducer from './state/Machines';
import recordsReducer from './state/Records';
import schedulesReducer from './state/Schedules';
import tasksReducer from './state/Tasks';
import usersReducer from './state/Users';

export default configureStore({
    reducer: {
        authToken: authTokenReducer,
        machines: machinesReducer,
        records: recordsReducer,
        schedules: schedulesReducer,
        tasks: tasksReducer,
        users: usersReducer,
    },
});
