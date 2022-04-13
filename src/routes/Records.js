import Table from 'react-bootstrap/Table';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/record.go

const Records = ({records}) => {
    return (
        <>
            <h2>Records</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Machine</th>
                        <th>Task</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                        <th>Output</th>
                    </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr>
                        <td>{record.machineName}</td>
                        <td>{record.taskName}</td>
                        <td>{record.executedAt}</td>
                        <td>{record.status}</td>
                        <td>{record.output}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default Records;
