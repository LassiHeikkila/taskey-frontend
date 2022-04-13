import Table from 'react-bootstrap/Table';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/user.go
// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/role.go

const getRoles = (r) => {
    const RoleUser          = (1 << 0);
    const RoleMaintainer    = (1 << 1);
    const RoleAdministrator = (1 << 2);
    const RoleRoot          = (1 << 3);

    var roles = [];
    if ((r & RoleUser) > 0) {
        roles.push("user");
    }
    if ((r & RoleMaintainer) > 0) {
        roles.push("maintainer");
    }
    if ((r & RoleAdministrator) > 0) {
        roles.push("administrator");
    }
    if ((r & RoleRoot) > 0) {
        roles.push("root");
    }

    return roles.join(' | ');
}

const Users = ({users}) => {
    return (
        <>
            <h2>Users</h2>

            <Table striped bordered hover>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                </tr>
                {users.map((user) => (
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{getRoles(user.role)}</td>
                    </tr>
                ))}
            </Table>
        </>
    );
}

export default Users;
