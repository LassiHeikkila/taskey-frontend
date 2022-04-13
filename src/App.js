import { useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import Home from './routes/Home';
import Tasks from './routes/Tasks';
import Schedules from './routes/Schedules';
import Machines from './routes/Machines';
import Records from './routes/Records';
import Users from './routes/Users';
import NotFound from './routes/NotFound';

import LoginView from './routes/LoginView';
import LogoutView from './routes/LogoutView';

import { selectToken, selectUser, selectOrg, selectRole, setToken } from './state/Auth';
import { selectMachines } from './state/Machines';
import { selectRecords } from './state/Records';
import { selectSchedules } from './state/Schedules';
import { selectTasks } from './state/Tasks';
import { selectUsers } from './state/Users';

import './App.css';

const localStorageTokenKey = 'taskey-token';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const machines = useSelector(selectMachines);
    const records = useSelector(selectRecords);
    const schedules = useSelector(selectSchedules);
    const tasks = useSelector(selectTasks);
    const users = useSelector(selectUsers);

    // do this only on initial page load
    useEffect(()=>{
        const t = window.localStorage.getItem(localStorageTokenKey);
        if (t && t !== '') {
            dispatch(setToken(t));
        }
    },[]);

    // save the token to local storage whenever it changes
    useEffect(()=>{
        window.localStorage.setItem(localStorageTokenKey, token);
    },[token]);

    return (
        <Container fluid='xxl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href={(token && token !== '') ? '/app' : '/'}>Taskey</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav activeKey='/' onSelect={(selectedKey) => navigate(selectedKey)}>
                        { (user && org) ?
                            <>
                                <Nav.Item>
                                    <Nav.Link eventKey='/account-settings'>Signed in as: {user} @ {org}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="/logout">Log out</Nav.Link>
                                </Nav.Item>
                            </>
                        :
                            <Nav.Item>
                                <Nav.Link eventKey="/login">Log in</Nav.Link>
                            </Nav.Item>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path='/login'  element={<LoginView  />} />
                <Route path='/logout' element={<LogoutView />} />
                { (token && token !== '') ?
                    <Route path='/app'    element={<Home       />}  >
                        <Route path="/app/tasks"     element={<Tasks      tasks={tasks}          />} />
                        <Route path="/app/schedules" element={<Schedules  schedules={schedules}  />} />
                        <Route path="/app/machines"  element={<Machines   machines={machines}    />} />
                        <Route path="/app/records"   element={<Records    records={records}      />} />
                        <Route path="/app/users"     element={<Users      users={users}          />} />
                    </Route>
                 :
                    <>
                        <Route index element={<div><p>Taskey is a task scheduling service. You can use it to remotely perform actions on connected machines.</p></div>} />
                        <Route path="*" element={<div><p>You must log in to use the application</p></div> } />
                    </>
                }
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
    );
}

export default App;
