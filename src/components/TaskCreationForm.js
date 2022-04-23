import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1132-L1143
// Task:
//   type: object
//   properties:
//     name:
//       type: string
//     description:
//       type: string
//     content:
//       type: object
//   required:
//     - name
//     - content

const TaskCreationForm = (props) => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);

    const [formOK, setFormOK] = useState(false);
    const [submitActive, setSubmitActive] = useState(false);

    const [name, setName] = useState(props.task?.name ?? '');
    const [description, setDescription] = useState(props.task?.description ?? '');

    const [taskType, setTaskType] = useState(props.task?.content.type ?? '');
    const [combinedOutput, setCombinedOutput] = useState(props.task?.content.combinedOutput ?? '');
    // cmd type task
    const [program, setProgram] = useState(props.task?.content.program ?? '');
    const [args, setArgs] = useState(props.task?.content.args ?? []);

    // script type task
    const [interpreter, setInterpreter] = useState(props.task?.content.interpreter ?? '');
    const [scriptBody, setScriptBody] = useState(props.task?.content.script ?? '');

    const [content, setContent] = useState({});

    useEffect(() => {
        if (taskType === 'cmd') {
            if (name !== '' && program !== '') {
                setFormOK(true);
            } else {
                setFormOK(false);
            }

            setContent({
                type: taskType,
                combinedOutput: combinedOutput,
                program: program,
                args: args,
            });
        }
    },[taskType, name, description, combinedOutput, program, args, setFormOK]);

    useEffect(() => {
        if (taskType === 'script') {
            if (name !== '' && interpreter !== '' && scriptBody !== '') {
                setFormOK(true);
            } else {
                setFormOK(false);
            }

            setContent({
                type: taskType,
                combinedOutput: combinedOutput,
                interpreter: interpreter,
                script: scriptBody,
            });
        }
    },[taskType, name, description, combinedOutput, interpreter, scriptBody, setFormOK]);

    useEffect(() => {
        if (taskType === '') {
            setFormOK(false);
        }
    }, [taskType, setFormOK]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formOK) {
            return
        }

        setSubmitActive(true);

        var method = 'POST';
        var endpoint = org+'/tasks/';
        if (props.id) {
            method = 'PUT';
            endpoint = org+'/tasks/'+props.id+'/';
        }

        doApiCall(token, method, endpoint, {name: name, description: description, content: content})
            .then(data => {
                setSubmitActive(false);
                if (data.code === 200) {
                    console.log('success submitting data:', data);
                } else {
                    console.error('failed to submit data:', data);
                }
            })
            .catch(e => {
                console.error('error submitting form:', e);
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
                        defaultValue={taskType}
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
};

export default TaskCreationForm;
