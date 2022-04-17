import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { selectToken, selectRole, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';
import { hasRole, RoleAdministrator } from '../lib/roles';

const RecordsTable = ({machine}) => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [records, setRecords] = useState([]);

    const { status, data, error } = useQuery(
        ['records', machine],
        () => doApiCall(
            token,
            'GET',
            org + '/machines/' + machine + '/records/'
        )
        .then(d => d.payload)
    );

    useEffect(() => {
        if (status === 'success' && data) {
            setRecords(data);
        } else if (status === 'error' ) {
            console.error('error fetching data:', error);
        }
    }, [status, data, error]);

    const handleDeleteRecord = ((recordID) => {
        doApiCall(
            token,
            'DELETE',
            org + '/machines/' + machine + '/records/' + recordID.toString() + '/'
        ).then()
    });

    return (
        <>
        { records && records.length > 0 ? (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Machine</th>
                        <th>Task</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                        <th>Output</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.machineName}</td>
                        <td>{record.taskName}</td>
                        <td>{record.executedAt}</td>
                        <td>{record.status}</td>
                        <td>{record.output}</td>
                        <Button onClick={handleDeleteRecord(record.id)} disabled={!hasRole(role, RoleAdministrator)}>Delete</Button>
                    </tr>
                ))}
                </tbody>
            </Table>
        ) : (
            <span>No records found</span>
        ) }
        </>
    );
};

export default RecordsTable;
