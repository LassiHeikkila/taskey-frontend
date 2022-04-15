import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';

import { selectToken, selectRole, selectOrg } from '../state/Auth';
import { selectRecords } from '../state/Records';

import { doApiCall } from '../lib/api';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/record.go

const Records = () => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [machines, setMachines] = useState([]);
    const [records, setRecords] = useState([]);

    const { status, data, error, isFetching } = useQuery('machines', () => doApiCall(token, 'GET', org+'/machines/').then(data => data.payload));

    useEffect(() => {
        if (status === 'success') {
            setMachines(data);
        }
    }, [status, data]);

    return (
        <Container>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Records</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                </Navbar.Collapse>
            </Navbar>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Machine</th>
                        <th>Task</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                        <th>Output</th>
                    </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr key={record.machineName + record.taskName + record.executedAt}>
                        <td>{record.machineName}</td>
                        <td>{record.taskName}</td>
                        <td>{record.executedAt}</td>
                        <td>{record.status}</td>
                        <td>{record.output}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Records;
