import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1117-L1131
// Machine:
//   type: object
//   properties:
//     name:
//       type: string
//     description:
//       type: string
//     os:
//       type: string
//     arch:
//       type: string
//   required:
//     - name
//     - OS
//     - Arch

const MachineCreationForm = () => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter machine name'></Form.Control>
                <Form.Text className='text-muted'>Name for machine</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter description'></Form.Control>
                <Form.Text className='text-muted'>(Optional) description for machine</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>OS</Form.Label>
                <Form.Control type='text' placeholder='OS'></Form.Control>
                <Form.Text className='text-muted'>Operating system of the device</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Architecture</Form.Label>
                <Form.Control type='text' placeholder='Arch'></Form.Control>
                <Form.Text className='text-muted'>CPU architecture of the device</Form.Text>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
};

export default MachineCreationForm;
