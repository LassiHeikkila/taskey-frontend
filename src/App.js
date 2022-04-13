import * as React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Home from './routes/Home';
import Tasks from './routes/Tasks';
import Schedules from './routes/Schedules';
import Machines from './routes/Machines';
import Records from './routes/Records';
import Users from './routes/Users';
import NotFound from './routes/NotFound';

import LoginView from './routes/LoginView';
import LogoutView from './routes/LogoutView';

import { selectUser, selectOrg } from './state/Auth';

import './App.css';

import { machines, records, users, tasks, schedules } from './data/dummy';

function App() {

    const user = useSelector(selectUser);
    const org = useSelector(selectOrg);

    return (
        <Container fluid='xxl'>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href="/app">Taskey</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        { (user && org) ?
                            <>
                            <Nav.Item>
                                <Nav.Link href='/change-pw'>Signed in as: {user} @ {org}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/logout">Log out</Nav.Link>
                            </Nav.Item>
                            </>
                        :
                            <Nav.Item>
                                <Nav.Link href="/login">Log in</Nav.Link>
                            </Nav.Item>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path='/login'  element={<LoginView  />} />
                <Route path='/logout' element={<LogoutView />} />
                <Route path='/app'    element={<Home       />}  >
                    <Route path="/app/tasks"     element={<Tasks      tasks={tasks}          />} />
                    <Route path="/app/schedules" element={<Schedules  schedules={schedules}  />} />
                    <Route path="/app/machines"  element={<Machines   machines={machines}    />} />
                    <Route path="/app/records"   element={<Records    records={records}      />} />
                    <Route path="/app/users"     element={<Users      users={users}          />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
    );
}

export default App;
