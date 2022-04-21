import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import TaskSelector from './TaskSelector';

const Singleshot = 1;
const Periodic   = 2;
const Cron       = 3;

const scheduleEntryTypeOptions = [
    { value: Singleshot, label: 'singleshot' },
    { value: Periodic, label: 'periodic' },
    { value: Cron, label: 'cron' },
]

const defaultScheduleEntryType = Periodic;

const ScheduleItemFormEntry = (props) => {
    const [taskOptions] = useState(props.taskOptions)
    const [selectedTask, setSelectedTask] = useState(props.taskOptions[0]);
    const [whenArg, setWhenArg] = useState('');

    const [scheduleEntryType, setScheduleEntryType] = useState(defaultScheduleEntryType);

    const handleScheduleEntryTypeChange = (e) => {
        setScheduleEntryType(e.value);
        setWhenArg('');
    }

    const handleWhenArgChangeSingleshot = (e) => {
        const dt = new Date(e.target.value);
        setWhenArg(dt.toISOString());
    }

    const handleWhenArgChangePeriodic = (e) => {
        setWhenArg(e.target.value);
    }

    const handleWhenArgChangeCron = (e) => {
        setWhenArg(e.target.value);
    }

    const handleTaskSelected = (o) => {
        setSelectedTask(o);
    }

    useEffect(() => {
        const item = constructScheduleItem();
        if (item) {
            props.onChange(item);
        }
    }, [selectedTask, whenArg, scheduleEntryType]);

    const constructScheduleItem = () => {
        if (scheduleEntryType && whenArg && selectedTask) {
            return {
                type: scheduleEntryType,
                when: whenArg,
                taskID: selectedTask.name,
            }
        }
    }

    return (
        <>
            <Form.Group>
                <Form.Label>When</Form.Label>
                { scheduleEntryType === Singleshot ? (
                    <Form.Control
                        type='datetime-local'
                        placeholder='at'
                        onChange={handleWhenArgChangeSingleshot}
                    />
                ) : scheduleEntryType === Periodic ? (
                    <Form.Control
                        type='text'
                        placeholder='every'
                        onChange={handleWhenArgChangePeriodic}
                    />
                ) : scheduleEntryType === Cron ? (
                    <Form.Control
                        type='text'
                        placeholder='0 12 * * * '
                        onChange={handleWhenArgChangeCron}
                    />
                ) : (
                    <>
                    </>
                )
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Entry type</Form.Label>
                <Select
                    options={scheduleEntryTypeOptions}
                    onChange={handleScheduleEntryTypeChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Task</Form.Label>
                <TaskSelector
                    options={taskOptions}
                    onChange={handleTaskSelected}
                />
            </Form.Group>
        </>
    );
}

export default ScheduleItemFormEntry;
