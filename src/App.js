import * as React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import Tasks from './routes/Tasks';
import Schedules from './routes/Schedules';
import Machines from './routes/Machines';
import Records from './routes/Records';
import Users from './routes/Users';
import NotFound from './routes/NotFound';

import LoginView from './routes/LoginView';
import LogoutView from './routes/LogoutView';

import './App.css';

import { machines, records, users, tasks, schedules } from './data/dummy';

function App() {

    return (
        <div className="App">
            <h1>Taskey</h1>
            <nav>
                <Link to="/login">Log in</Link>{" "}
                <Link to="/logout">Log out</Link>
            </nav>

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
        </div>
    );
}

export default App;
