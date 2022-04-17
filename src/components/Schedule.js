import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ScheduleCreationForm from './ScheduleCreationForm';

import { selectToken, selectRole, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';
import { hasRole, RoleMaintainer } from '../lib/roles';

const isEmpty = (o) => {
    // what the hell? seems like this should be trivial.
    // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.keys(o).length === 0
}

const Schedule = ({machineName}) => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [schedule, setSchedule] = useState({});

    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCloseCreateForm = () => setShowCreateForm(false);
    const handleOpenCreateForm = () => setShowCreateForm(true);

    const { status, data, error } = useQuery(
        ['schedule', machineName],
        () => doApiCall(
            token,
            'GET',
            org + '/machines/' + machineName + '/schedule/'
        )
        .then(d => d.payload)
    );

    useEffect(() => {
        if (status === 'success' && data) {
            setSchedule(data);
        } else if (status === 'error') {
            console.error('error fetching data:', error.message);
        }
    }, [status, data, error]);

    return (
        isEmpty(schedule) ? (
            <>
                <span>No schedule defined</span>{' '}
                <Button onClick={handleOpenCreateForm} disabled={!hasRole(role, RoleMaintainer)}>Create schedule</Button>
                <Modal show={showCreateForm} onHide={handleCloseCreateForm}>
                    <Modal.Body>
                        <ScheduleCreationForm machineName={machineName} />
                    </Modal.Body>
                </Modal>
            </>
        ) : (
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>When</th>
                    <th>What</th>
                    </tr>
                </thead>
                <tbody>
                {schedule.singleshot.map((singleshotTask) => (
                    <tr key={singleshotTask.taskID + singleshotTask.when}>
                    <td>At: {singleshotTask.when}</td>
                    <td>{singleshotTask.taskID}</td>
                    </tr>
                ))}
                {schedule.periodically.map((periodicTask) => (
                    <tr key={periodicTask.taskID + periodicTask.every}>
                    <td>Every: {periodicTask.every}</td>
                    <td>{periodicTask.taskID}</td>
                    </tr>
                ))}
                {schedule.cron.map((cronTask) => (
                    <tr key={cronTask.taskID + cronTask.cron}>
                    <td>Cron: {cronTask.cron}</td>
                    <td>{cronTask.taskID}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    )
};

export default Schedule;
