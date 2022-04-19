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
    }

    const handleWhenArgChange = (e) => {
        setWhenArg(e.target.value);
    }

    const handleTaskSelected = (o) => {
        setSelectedTask(o);
    }

    useEffect(() => {
        props.onChange(constructScheduleItem());
    }, [selectedTask, whenArg, scheduleEntryType]);

    const constructScheduleItem = () => {
        return {
            type: scheduleEntryType,
            when: whenArg,
            taskID: selectedTask.name,
        }
    }

    return (
        <>
            <Form.Group>
                <Form.Label>When</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Schedule'
                    onChange={handleWhenArgChange}
                />
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
