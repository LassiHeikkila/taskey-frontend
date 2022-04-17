import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import { selectToken, selectOrg } from '../state/Auth';
import { doApiCall } from '../lib/api';

import Schedule from '../components/Schedule';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/schedule.go

const Schedules = () => {
    const token = useSelector(selectToken);
    const org = useSelector(selectOrg);

    const [machines, setMachines] = useState([]);

    const { status, data, error } = useQuery('machines', () => doApiCall(token, 'GET', org+'/machines/').then(d => d.payload));

    useEffect(() => {
        if (status === 'success' && data) {
            setMachines(data);
        } else if (status === 'error' ){
            console.error('error fetching data:', error.message);
        }
    }, [status, data, error]);

    return (
        <Container>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Schedules</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <TabContainer >
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
                                <Schedule machineName={machine.name} />
                            </TabPane>
                        </TabContent>
                    ))}
                    </Col>
                </TabContainer>
            </Row>
        </Container>
    );
};

export default Schedules;
