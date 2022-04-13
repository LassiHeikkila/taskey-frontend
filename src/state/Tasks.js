import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: [
            {
                name: 'record-soil-humidity',
                description: 'record soil humidity with attached sensor',
                content: {
                    type: 'cmd',
                    program: '/usr/bin/humidity',
                    args: [
                        '-probe', '1'
                    ]
                }
            },
            {
                name: 'record-air-humidity',
                description: 'record air humidity with attached sensor',
                content: {
                    type: 'cmd',
                    program: '/usr/bin/humidity',
                    args: [
                        '-probe', '2'
                    ]
                }
            },
            {
                name: 'toggle-lights',
                description: 'toggle lights connected to device output',
                content: {
                    type: 'script',
                    interpreter: 'bash',
                    script: `#!/bin/bash
        if [ "$(cat /dev/gpio/lights)" = "1" ]; then
            echo 0 > /dev/gpio/lights
        else
            echo 1 > /dev/gpio/lights
        fi
        `,
                }
            },
            {
                name: 'store-lights-state',
                description: 'read lights state and store into MongoDB',
                content: {
                    type: 'script',
                    interpreter: 'python',
                    script: `import pymongo
        import datetime

        with open("/dev/gpio/lights") as f:
            s = f.read()

            myclient = pymongo.MongoClient('mongodb://localhost:27017/')
            mydb = myclient['mydatabase']
            mycol = mydb["lights"]

            dt = datetime.datetime.now()

            mydict = { "name": "lights", "state": s, "datetime": dt }

            x = mycol.insert_one(mydict)

        `,
                }
            },
        ],
    },
    reducers: {
        setTasks: (state, action) => {
            state.value = action.payload;
        },
        clearTasks: (state) => {
            state.value = [];
        },
    },
});

export const { setTasks, clearTasks } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.value;

export default tasksSlice.reducer;
