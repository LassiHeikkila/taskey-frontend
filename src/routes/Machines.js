import Table from 'react-bootstrap/Table';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/machine.go

const Machines = ({machines}) => {
    return (
        <>
            <h2>Machines</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>OS</th>
                        <th>Arch</th>
                    </tr>
                </thead>
                <tbody>
                {machines.map((machine) => (
                    <tr>
                        <td>{machine.name}</td>
                        <td>{machine.description}</td>
                        <td>{machine.os}</td>
                        <td>{machine.arch}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default Machines;
