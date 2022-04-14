import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getRoles, hasRole, RoleRoot } from '../lib/roles';
import { doApiCall } from '../lib/api';
import UserCreationForm from '../components/UserCreationForm';
import { selectRole, selectOrg, selectToken } from '../state/Auth';
import { selectUsers } from '../state/Users';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/user.go
// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/role.go

const Users = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [users, setUsers] = useState([]);

    const { status, data, error, isFetching } = useQuery('users', () => doApiCall(token, 'GET', org+'/users/').then(data => data.payload).then(pl => setUsers(pl)));

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
            { status === 'loading' ? (
                <span>Loading...</span>
            ) : status === 'error' ? (
                <span>Error loading data: {error.message}</span>
            ) : (
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
            )}
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Modal.Body>
                    <UserCreationForm />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Users;
