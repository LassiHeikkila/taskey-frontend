import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearToken, selectToken } from '../state/Auth';

const LogoutView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    useEffect(() => {
        console.log('token is: ' + token);
        if (token && token !== '') {
            dispatch(clearToken());
        } else {
            console.log('empty token, navigating to home')
            navigate('/');
        }
    }, [token, navigate, dispatch]);

    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Logging out...</span>
        </Spinner>
    )
};

export default LogoutView;
