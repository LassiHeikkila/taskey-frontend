import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Home = () => {
    const [key, setKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        navigate(key);
    }, [key, navigate]);

    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey='machines' title='Machines' >
                <Outlet />
            </Tab>
            <Tab eventKey='schedules' title='Schedules' >
                <Outlet />
            </Tab>
            <Tab eventKey='tasks' title='Tasks' >
                <Outlet />
            </Tab>
            <Tab eventKey='users' title='Users' >
                <Outlet />
            </Tab>
            <Tab eventKey='records' title='Records' >
                <Outlet />
            </Tab>
        </Tabs>
    );
}

export default Home;
