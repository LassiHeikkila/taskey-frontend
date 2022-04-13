import { useState } from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getRoles, hasRole, RoleRoot } from '../lib/roles';
import UserCreationForm from '../components/UserCreationForm';
import { selectRole } from '../state/Auth';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/user.go
// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/role.go

const Users = ({users}) => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const role = useSelector(selectRole);

    return (
        <Container fluid='xl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href="/app">Users</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Button onClick={handleOpenCreateForm} disabled={!hasRole(role, RoleRoot)}>New user</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Table striped bordered hover>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                </tr>
                {users.map((user) => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{getRoles(user.role)}</td>
                    </tr>
                ))}
            </Table>
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Modal.Body>
                    <UserCreationForm />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Users;
