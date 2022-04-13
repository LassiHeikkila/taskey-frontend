import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1100-L1116
// User:
//   type: object
//   properties:
//     name:
//       type: string
//     email:
//       type: string
//       format: email
//     organization:
//       type: string
//     role:
//       type: integer
//   required:
//     - name
//     - email
//     - organization
//     - role

const UserCreationForm = () => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter task name'></Form.Control>
                <Form.Text className='text-muted'>Name for machine</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter email'></Form.Control>
                <Form.Text className='text-muted'>Email address of the user</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Roles</Form.Label>
                    <Form.Group className="mb-3" controlId="checkboxRoleRoot">
                        <Form.Check type="checkbox" label="root" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="checkboxRoleAdministrator">
                        <Form.Check type="checkbox" label="administrator" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="checkboxRoleMaintainer">
                        <Form.Check type="checkbox" label="maintainer" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="checkboxRoleUser">
                        <Form.Check type="checkbox" label="user" />
                    </Form.Group>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
};

export default UserCreationForm;
