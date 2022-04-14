import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import MachineCreationForm from '../components/MachineCreationForm';
import { hasRole, RoleAdministrator } from '../lib/roles';
import { selectToken, selectRole, selectOrg } from '../state/Auth';
import { selectMachines } from '../state/Machines';

import { doApiCall } from '../lib/api';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1117-L1131

const Machines = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [machines, setMachines] = useState([]);

    const { status, data, error, isFetching } = useQuery('machines', () => doApiCall(token, 'GET', org+'/machines/').then(data => data.payload).then(pl => setMachines(pl)));

    return (
        <Container fluid='xl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href="/app">Machines</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Button onClick={handleOpenCreateForm} disabled={!hasRole(role, RoleAdministrator)}>New machine</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            { status === 'loading' ? (
                <span>Loading...</span>
            ) : status === 'error' ? (
                <span>Error loading data: {error.message}</span>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>OS</th>
                            <th>Arch</th>
                        </tr>
                    </thead>
                    <tbody>
                    {machines.map((machine) => (
                        <tr>
                            <td>{machine.name}</td>
                            <td>{machine.description}</td>
                            <td>{machine.os}</td>
                            <td>{machine.arch}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>)
            }
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Modal.Body>
                    <MachineCreationForm />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Machines;
