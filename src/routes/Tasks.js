import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SyntaxHighlighter from 'react-syntax-highlighter';

import Modal from 'react-bootstrap/Modal';

import TaskCreationForm from '../components/TaskCreationForm';

import { hasRole, RoleAdministrator } from '../lib/roles';
import { doApiCall } from '../lib/api';
import { selectRole, selectOrg, selectToken } from '../state/Auth';
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
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [tasks, setTasks] = useState([]);
    const [cmdTasks, setCmdTasks] = useState([]);
    const [scriptTasks, setScriptTasks] = useState([]);

    const { status, data, error, isFetching } = useQuery('tasks', () => doApiCall(token, 'GET', org+'/tasks/').then(data => data.payload));

    useEffect(() => {
        if (status === 'success') {
            setTasks(data);
        }
    }, [status, data]);

    useEffect(() => {
        setCmdTasks(tasks.filter(task => task.content.type === 'cmd'));
        setScriptTasks(tasks.filter(task => task.content.type === 'script'));
    }, [tasks]);

    return (
        <Container fluid='xl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Tasks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Button onClick={handleOpenCreateForm} disabled={!hasRole(role, RoleAdministrator)}>New task</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            { status === 'loading' ? (
                <span>Loading...</span>
            ) : status === 'error' ? (
                <span>Error loading data: {error.message}</span>
            ) : (
                <>
                <h3>Commands</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Program & Arguments</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cmdTasks.map((task) => (
                        <tr key={task.name}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>
                                <SyntaxHighlighter language='console'>
                                    {task.content.program + ' ' + task.content.args.join(' ')}
                                </SyntaxHighlighter>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <h3>Scripts</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Interpreter</th>
                            <th>Script</th>
                        </tr>
                    </thead>
                    <tbody>
                    {scriptTasks.map((task) => (
                        <tr key={task.name}>
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
                    </tbody>
                </Table>
                </>
            )}
            <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                <Modal.Body>
                    <TaskCreationForm />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Tasks;
