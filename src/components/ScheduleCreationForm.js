import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';
import update from 'immutability-helper';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Select from 'react-select';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';
import ScheduleItemFormEntry from './ScheduleItemFormEntry';

// TODO: move these to some common file, don't re-define them
const Singleshot = 1;
const Periodic   = 2;
const Cron       = 3;

const ScheduleCreationForm = ({machineName}) => {
    const queryClient = useQueryClient;

    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);

    const [formOK, setFormOK] = useState(false);
    const [submitActive, setSubmitActive] = useState(false);

    const [tasks, setTasks] = useState([]);

    const [content, setContent] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formOK) {
            return
        }

        setSubmitActive(true);

        doApiCall(
            token,
            'POST',
            org + '/machines/' + machineName + '/schedule/',
            content
        )
        .then(data => {
            setSubmitActive(false);
            if (data.code === 200) {
                console.log('success POSTing data:', data.payload);
                // re-fetch schedule, now it should be there
                queryClient.invalidateQueries(['schedule', machineName]);
            } else {
                console.error('failed to POST data:', data.payload);
            }
        })
        .catch(e => {
            console.error('error posting form:', e);
        });
    };

    const [scheduledTasks, setScheduledTasks] = useState([]);

    useEffect(() => {
        console.info('scheduled tasks:', scheduledTasks);
        if (scheduledTasks.length > 0) {
            setFormOK(true);
        } else {
            setFormOK(false);
        }

        const singleshotTasks = scheduledTasks.filter(t => t.type === Singleshot);
        const periodicTasks = scheduledTasks.filter(t => t.type === Periodic);
        const cronTasks = scheduledTasks.filter(t => t.type === Cron);

        var schedule = {
            singleshot: [],
            periodically: [],
            cron: [],
        };

        for (const t of singleshotTasks) {
            schedule.singleshot.push({
                when: t.when,
                taskID: t.taskID,
            });
        }
        for (const t of periodicTasks) {
            schedule.periodically.push({
                every: t.when,
                taskID: t.taskID,
            });
        }
        for (const t of cronTasks) {
            schedule.cron.push({
                cron: t.when,
                taskID: t.taskID,
            });
        }

        setContent(schedule);
    }, [scheduledTasks]);

    const addTaskDefinitionField = () => {
        let st = [...scheduledTasks];
        st.push({});
        setScheduledTasks(st);
    }

    const removeTaskDefinitionField = (i) => {
        let st = [...scheduledTasks];
        st.splice(i, 1);
        setScheduledTasks(st);
    }

    const { status, data, error, isFetching } = useQuery(
        'tasks',
        () => doApiCall(
            token,
            'GET',
            org+'/tasks/'
        )
        .then(data => data.payload)
    );

    useEffect(() => {
        if (status === 'success') {
            setTasks(data);
        } else if (status === 'error') {
            console.error('error fetching data:', error.message);
        }
    }, [status, data]);

    return (
        <>
        { submitActive ? (
            <Spinner animation="border" variant="primary" />
        ) : (
            <Form onSubmit={handleSubmit}>
                {scheduledTasks.map((e, i) => (
                    <>
                        <ScheduleItemFormEntry
                            taskOptions={tasks}
                            onChange={e => {
                                const st = update(scheduledTasks, {
                                    [i]: {$set: e}
                                });
                                setScheduledTasks(st)
                                console.debug('schedule item set:', e);
                            }}
                        />
                        <Button type='button' onClick={removeTaskDefinitionField.bind(i)}>-</Button>
                    </>
                ))}
                <br />
                <Button type='button' onClick={addTaskDefinitionField}>+</Button>
                <Button type='submit' disabled={!formOK || submitActive}>Submit</Button>
            </Form>
        )}
        </>
    )
}

export default ScheduleCreationForm;
