import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';

import { selectToken, selectRole } from '../state/Auth';
import { selectRecords } from '../state/Records';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/record.go

const Records = () => {
    const token = useSelector(selectToken);
    const records = useSelector(selectRecords);

    return (
        <Container>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href="/app">Records</Navbar.Brand>
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
                    <tr>
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
