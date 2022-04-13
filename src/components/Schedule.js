import Table from 'react-bootstrap/Table';

const Schedule = ({schedule}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>When</th>
                    <th>What</th>
                </tr>
            </thead>
            <tbody>
            {schedule.singleshot.map((singleshotTask) => (
                <tr>
                    <td>At: {singleshotTask.when}</td>
                    <td>{singleshotTask.taskID}</td>
                </tr>
            ))}
            {schedule.periodically.map((periodicTask) => (
                <tr>
                    <td>Every: {periodicTask.every}</td>
                    <td>{periodicTask.taskID}</td>
                </tr>
            ))}
            {schedule.cron.map((cronTask) => (
                <tr>
                    <td>Cron: {cronTask.cron}</td>
                    <td>{cronTask.taskID}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
};

export default Schedule;
