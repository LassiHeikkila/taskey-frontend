import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import Select from 'react-select';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';
import ScheduleItemFormEntry from './ScheduleItemFormEntry';

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
        } else if (status === 'error' ) {
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
