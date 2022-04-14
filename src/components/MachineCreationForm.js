import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1117-L1131
// Machine:
//   type: object
//   properties:
//     name:
//       type: string
//     description:
//       type: string
//     os:
//       type: string
//     arch:
//       type: string
//   required:
//     - name
//     - OS
//     - Arch

const formValid = (name, description, os, arch) => {
    return name !== '' && os !== '' && arch !== '';
}

const MachineCreationForm = () => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);

    const [formOK, setFormOK] = useState(false);
    const [submitActive, setSubmitActive] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [os, setOS] = useState('');
    const [arch, setArch] = useState('');

    useEffect(() => {
        setFormOK(formValid(name, description, os, arch));
    }, [setFormOK, name, description, os, arch]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formOK) {
            return
        }

        setSubmitActive(true);

        doApiCall(token, 'POST', org+'/machines/', {name: name, description: description, os: os, arch: arch})
            .then(data => {
                setSubmitActive(false);
                if (data.code === 200) {
                    console.log('success POSTing data:', data.payload);
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
                        placeholder='Enter machine name'
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
                    <Form.Text className='text-muted'>(Optional) description for machine</Form.Text>
                </Form.Group>
                    <Form.Group>
                    <Form.Label>OS</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='OS'
                        value={os}
                        onChange={(e) => setOS(e.target.value)}
                    />
                    <Form.Text className='text-muted'>Operating system of the device</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Architecture</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Arch'
                        value={arch}
                        onChange={(e) => setArch(e.target.value)}
                    />
                    <Form.Text className='text-muted'>CPU architecture of the device</Form.Text>
                </Form.Group>
                <Button type="submit" disabled={!formOK || submitActive}>Submit</Button>
            </Form>
        ) }
        </>
    )
};

export default MachineCreationForm;
