import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setToken, selectToken } from '../state/Auth';
import { getToken } from '../lib/auth';

const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showErrToast, setShowErrToast] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [loginActive, setLoginActive] = useState(false);
    const [inputsOK, setInputsOK] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(selectToken);

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoginActive(true);
        setTimeout(() => {
            setLoginActive(false);
        }, 5000);

        console.log('logging in with username: ' + username);

        getToken(username, password)
            .then(token => {
                console.log('got token: ' + token);
                if (token && token !== '') {
                    dispatch(setToken(token));
                } else {
                    setErrMsg('Failed to login!');
                    setShowErrToast(true);
                    setTimeout(() => {
                        setShowErrToast(false);
                        setErrMsg('');
                    }, 5000);
                }
            });
    };

    useEffect(() => {
        console.log('token is: ' + token);
        if (token && token !== '') {
            console.log('token set, navigating to home page');
            navigate('/app');
        }
    }, [token, navigate]);

    useEffect(() => {
        setInputsOK(
            username && username !== '' &&
            password && password !== ''
        );
    }, [username, password]);

    return (
        <div>
        <ToastContainer position="top-end">
            <Toast show={showErrToast}>
                <Toast.Body>{errMsg}</Toast.Body>
            </Toast>
        </ToastContainer>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicUsername' >
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword' >
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant='primary' type='submit' disabled={loginActive || !inputsOK}>
                {loginActive ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                  : <></>}
                <span>Submit</span>
            </Button>
        </Form>
        </div>
    )
};

export default LoginView;
