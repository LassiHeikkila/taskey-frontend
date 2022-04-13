import { useState } from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SyntaxHighlighter from 'react-syntax-highlighter';

import Modal from 'react-bootstrap/Modal';

import TaskCreationForm from '../components/TaskCreationForm';

import { hasRole, RoleAdministrator } from '../lib/roles';
import { selectRole } from '../state/Auth';
import { selectTasks } from '../state/Tasks';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/task.go

const getHighlightLanguage = (interpreter) => {
    switch (interpreter) {
        case 'python':
        case 'python3':
            return 'python';
        case 'bash':
            return 'bash';
        case 'sh':
            return 'sh';
        default:
            return 'bash';
    }
}

const Tasks = () => {
    const tasks = useSelector(selectTasks);

    const cmdTasks = tasks.filter(task => task.content.type === 'cmd');
    const scriptTasks = tasks.filter(task => task.content.type === 'script');

    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const role = useSelector(selectRole);

    return (
        <Container fluid='xl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href="/app">Tasks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Button onClick={handleOpenCreateForm} disabled={!hasRole(role, RoleAdministrator)}>New task</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h3>Command Tasks</h3>
            <Table striped bordered hover>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Program & Arguments</th>
                </tr>
                {cmdTasks.map((task) => (
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <SyntaxHighlighter language='console'>
                            {task.content.program + ' ' + task.content.args.join(' ')}
                        </SyntaxHighlighter>
                    </tr>
                ))}
            </Table>

            <h3>Script Tasks</h3>
            <Table striped bordered hover>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Interpreter</th>
                    <th>Script</th>
                </tr>
                {scriptTasks.map((task) => (
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.content.interpreter}</td>
                        <td>
                            <SyntaxHighlighter
                                language={getHighlightLanguage(task.content.interpreter)}
                                showLineNumbers='true'
                            >
                                {task.content.script}
                            </SyntaxHighlighter>
                        </td>
                    </tr>
                ))}
            </Table>
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Modal.Body>
                    <TaskCreationForm />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Tasks;
