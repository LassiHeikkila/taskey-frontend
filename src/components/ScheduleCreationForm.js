import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';

const ScheduleCreationForm = ({machineName}) => {
    const queryClient = useQueryClient;

    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);

    const [formOK, setFormOK] = useState(false);
    const [submitActive, setSubmitActive] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [taskType, setTaskType] = useState('');
    const [combinedOutput, setCombinedOutput] = useState(false);
    // cmd type task
    const [program, setProgram] = useState('');
    const [args, setArgs] = useState([]);

    // script type task
    const [interpreter, setInterpreter] = useState('');
    const [scriptBody, setScriptBody] = useState('');

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

    return (
        <>
        { submitActive ? (
            <Spinner animation="border" variant="primary" />
        ) : (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter task name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Text className='text-muted'>Name for machine</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Text className='text-muted'>(Optional) description for task</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Task type</Form.Label>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setTaskType(e.target.value)}
                    >
                        <option value=''>Task type</option>
                        <option value="cmd">Command</option>
                        <option value="script">Script</option>
                    </Form.Select>
                </Form.Group>
                { taskType === 'cmd' ? (
                    <>
                        <Form.Group>
                            <Form.Label>Program</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='/usr/bin/command'
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Arguments</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='arg1 arg2'
                                value={args.join(' ')}
                                onChange={(e) => setArgs(e.target.value.split(' '))}
                            />
                        </Form.Group>
                    </>
                ) : taskType === 'script' ? (
                    <>
                        <Form.Group>
                            <Form.Label>Interpreter</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='bash'
                                value={interpreter}
                                onChange={(e) => setInterpreter(e.target.value)}
                            />
                            <Form.Text className='text-muted'>Interpreter for running script</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Script body</Form.Label>
                            <Form.Control
                                type='text'
                                as='textarea'
                                rows={10}
                                placeholder='echo "success"'
                                value={scriptBody}
                                onChange={(e) => setScriptBody(e.target.value)}
                            />
                            <Form.Text className='text-muted'>Interpreter for running script</Form.Text>
                        </Form.Group>
                    </>
                ) : (<></>) }

                <Button type="submit" disabled={!formOK || submitActive}>Submit</Button>
            </Form>
        )}
        </>
    )
}

export default ScheduleCreationForm;
