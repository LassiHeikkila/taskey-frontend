const machines = [
    { name: 'raspberrypi-3B-01', description: 'raspberry pi connected to lights', os: 'Linux', arch: 'arm32' },
    { name: 'raspberrypi-zeroW-05', description: 'raspberry pi zero w connected to thermostat', os: 'Linux', arch: 'arm32' }
];

const records = [
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:19:00.000+03:00', status: 0, output: 'humidity is 100%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:20:00.000+03:00', status: 0, output: 'humidity is 96%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:21:00.000+03:00', status: 0, output: 'humidity is 92%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:22:00.000+03:00', status: 0, output: 'humidity is 75%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:23:00.000+03:00', status: 0, output: 'humidity is 100%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:24:00.000+03:00', status: 0, output: 'humidity is 99%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:25:00.000+03:00', status: 0, output: 'humidity is 98%' },
    { machineName: 'raspberrypi-zeroW-05', taskName: 'record-soil-humidity', executedAt: '2022-04-11T14:26:00.000+03:00', status: 0, output: 'humidity is 97%' },
];

const tasks = [
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
];
const users = [
    { name: 'Lassi Heikkilä', email: 'lassi@example.com', role: 15 },
    { name: 'Teppo Testaaja', email: 'teppo@example.com', role: 7 },
    { name: 'Tim Tester', email: 'tim@example.com', role: 3 },
];

const schedules = [
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
];

export { machines, tasks, users, records, schedules };
