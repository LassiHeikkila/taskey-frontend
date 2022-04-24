import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';
import { getRoles, hasRole, RoleRoot, RoleAdministrator, RoleMaintainer, RoleUser } from '../lib/roles';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1100-L1116
// User:
//   type: object
//   properties:
//     name:
//       type: string
//     email:
//       type: string
//       format: email
//     organization:
//       type: string
//     role:
//       type: integer
//   required:
//     - name
//     - email
//     - organization
//     - role

const formValid = (name, email) => {
    return name !== '' && email !== '';
}

const UserCreationForm = (props) => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);

    const queryClient = useQueryClient();

    const [formOK, setFormOK] = useState(false);
    const [submitActive, setSubmitActive] = useState(false);

    const [name, setName] = useState(props.user?.name ?? '');
    const [email, setEmail] = useState(props.user?.email ?? '');
    const [roles, setRoles] = useState(props.user?.role ?? 0);

    const setRole = (r) => {
        setRoles(roles | r);
    };

    const unsetRole = (r) => {
        setRoles(roles ^ r);
    };

    useEffect(() => {
        setFormOK(formValid(name, email, roles));
    }, [setFormOK, name, email, roles]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formOK) {
            return;
        }

        var method = 'POST';
        var endpoint = org+'/users/';
        if (props.id) {
            method = 'PUT';
            endpoint = org+'/users/'+props.id+'/';
        }

        setSubmitActive(true);

        doApiCall(token, method, endpoint, {name: name, email: email, role: roles})
            .then(data => {
                setSubmitActive(false);
                if (data.code === 200) {
                    console.log('success submitting data:', data.payload);
                    queryClient.invalidateQueries(['users']);
                } else {
                    console.error('failed to submit data:', data.payload);
                }
            })
            .catch(e => {
                setSubmitActive(false);
                console.error('error submitting form:', e.message);
            });
    };

    return (
        <>
        { submitActive ? (
            <Spinner animation='border' variant='primary' />
        ) : (
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={props.id}
                    />
                    <Form.Text className='text-muted'>Name for user</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={props.id}
                    />
                    <Form.Text className='text-muted'>Email address of the user</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Roles</Form.Label>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            label='root'
                            checked={hasRole(roles, RoleRoot)}
                            onChange={(evt) => {
                                if (evt.target.checked) {
                                    setRole(RoleRoot);
                                } else {
                                    unsetRole(RoleRoot);
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            label='administrator'
                            checked={hasRole(roles, RoleAdministrator)}
                            onChange={(evt) => {
                                if (evt.target.checked) {
                                    setRole(RoleAdministrator);
                                } else {
                                    unsetRole(RoleAdministrator);
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            label='maintainer'
                            checked={hasRole(roles, RoleMaintainer)}
                            onChange={(evt) => {
                                if (evt.target.checked) {
                                    setRole(RoleMaintainer);
                                } else {
                                    unsetRole(RoleMaintainer);
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            label='user'
                            checked={hasRole(roles, RoleUser)}
                            onChange={(evt) => {
                                if (evt.target.checked) {
                                    setRole(RoleUser);
                                } else {
                                    unsetRole(RoleUser);
                                }
                            }}
                        />
                    </Form.Group>
                </Form.Group>
                <Button type="submit" disabled={!formOK || submitActive}>Submit</Button>
            </Form>
        ) }
        </>
    )
};

export default UserCreationForm;
