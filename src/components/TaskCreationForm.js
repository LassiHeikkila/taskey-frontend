import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// https://github.com/LassiHeikkila/taskey/blob/main/docs/openapi.yml#L1132-L1143
// Task:
//   type: object
//   properties:
//     name:
//       type: string
//     description:
//       type: string
//     content:
//       type: object
//   required:
//     - name
//     - content

const TaskCreationForm = () => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter task name'></Form.Control>
                <Form.Text className='text-muted'>Name for machine</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter description'></Form.Control>
                <Form.Text className='text-muted'>(Optional) description for task</Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control type='text' placeholder='{"content":"something"}'></Form.Control>
                <Form.Text className='text-muted'>JSON encoded description of the task (to be refined)</Form.Text>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
};

export default TaskCreationForm;
