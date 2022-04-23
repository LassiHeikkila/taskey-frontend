import { useState, useEffect } from 'react';
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
    const [showEditForm, setShowEditForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const handleCloseEditForm = () => setShowEditForm(false);
    const handleOpenEditForm = () => setShowEditForm(true);

    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [machines, setMachines] = useState([]);

    // for edit form
    const [selectedMachine, setSelectedMachine] = useState({});

    const { status, data, error, isFetching } = useQuery('machines', () => doApiCall(token, 'GET', org+'/machines/').then(data => data.payload));

    useEffect(() => {
        if (status === 'success') {
            setMachines(data);
        } else if (status === 'error' ){
            console.error('error fetching data:', error.message);
        }
    }, [status, data]);

    return (
        <Container fluid='xl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Machines</Navbar.Brand>
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
                    <thead key='thead'>
                        <tr key='thead-row'>
                            <th>Name</th>
                            <th>Description</th>
                            <th>OS</th>
                            <th>Arch</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody key='tbody'>
                    {machines.map((machine) => (
                        <tr key={machine.name}>
                            <td>{machine.name}</td>
                            <td>{machine.description}</td>
                            <td>{machine.os}</td>
                            <td>{machine.arch}</td>
                            <td><Button onClick={() => {setSelectedMachine(machine); handleOpenEditForm()}} disabled={!hasRole(role, RoleAdministrator)}>Edit</Button></td>
                            <td><Button onClick={() => {console.info('i want to delete!')}} disabled={!hasRole(role, RoleAdministrator)}>Delete</Button></td>
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
            <Modal show={showEditForm} onHide={handleCloseEditForm}>
                <Modal.Body>
                    <MachineCreationForm id={selectedMachine.name} machine={selectedMachine} />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Machines;
