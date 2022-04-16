import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Container from 'react-bootstrap/Container';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RecordsTable from '../components/RecordsTable';

import { selectToken, selectRole, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/record.go

const Records = () => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);
    const role = useSelector(selectRole);

    const [machines, setMachines] = useState([]);
    const [chosenMachine, setChosenMachine] = useState('');
    const [records, setRecords] = useState({});

    const { status, data, error, isFetching } = useQuery('machines', () => doApiCall(token, 'GET', org+'/machines/').then(d => d.payload));

    useEffect(() => {
        if (status === 'success' && data) {
            setMachines(data);
        } else if (status === 'error' ){
            console.error('error fetching data:', error);
        }
    }, [status, data]);

    return (
        <Container>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Records</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" />
            </Navbar>
            <Row>
                <TabContainer>
                    <Col sm={2}>
                    {machines.map((machine) => (
                        <Nav variant="pills" defaultActiveKey='' className='flex-column' key={machine.name + "-nav"}>
                            <Nav.Item key={machine.name + "-navitem"}>
                                <Nav.Link eventKey={machine.name}>{machine.name}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    ))}
                    </Col>
                    <Col sm={10}>
                    {machines.map((machine) => (
                        <TabContent key={machine.name + "-tabcontent"}>
                            <TabPane eventKey={machine.name} key={machine.name + "-tabpane"}>
                                <RecordsTable machine={machine.name} />
                            </TabPane>
                        </TabContent>
                    ))}
                    </Col>
                </TabContainer>
            </Row>
        </Container>
    );
}

export default Records;
