import Table from 'react-bootstrap/Table';
import SyntaxHighlighter from 'react-syntax-highlighter';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/task.go

const getHighlightLanguage = (interpreter) => {
    switch (interpreter) {
        case 'python':
        case 'python3':
            return 'python';
        case 'bash':
            return 'bash';
        case 'sh':
            return 'sh';
        default:
            return 'bash';
    }
}

const Tasks = ({tasks}) => {
    const cmdTasks = tasks.filter(task => task.content.type === 'cmd');
    const scriptTasks = tasks.filter(task => task.content.type === 'script');

    return (
        <>
            <h2>Command Tasks</h2>
            <Table striped bordered hover>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Program & Arguments</th>
                </tr>
                {cmdTasks.map((task) => (
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <SyntaxHighlighter language='console'>
                            {task.content.program + ' ' + task.content.args.join(' ')}
                        </SyntaxHighlighter>
                    </tr>
                ))}
            </Table>

            <h2>Script Tasks</h2>
            <Table striped bordered hover>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Interpreter</th>
                    <th>Script</th>
                </tr>
                {scriptTasks.map((task) => (
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.content.interpreter}</td>
                        <td>
                            <SyntaxHighlighter
                                language={getHighlightLanguage(task.content.interpreter)}
                                showLineNumbers='true'
                            >
                                {task.content.script}
                            </SyntaxHighlighter>
                        </td>
                    </tr>
                ))}
            </Table>
        </>
    );
}

export default Tasks;
