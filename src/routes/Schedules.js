import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import Schedule from '../components/Schedule';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/schedule.go

const Schedules = ({schedules}) => {
    return (
        <Container>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand href="/app">Schedules</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                </Navbar.Collapse>
            </Navbar>
            <TabContainer >
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" defaultActiveKey='' className='flex-column'>
                            {schedules.map((schedule) => (
                                <Nav.Item>
                                    <Nav.Link eventKey={schedule.machineName}>{schedule.machineName}</Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <TabContent>
                            {schedules.map((schedule) => (
                                <TabPane eventKey={schedule.machineName}>
                                    <Schedule schedule={schedule} />
                                </TabPane>
                            ))}
                        </TabContent>
                    </Col>
                </Row>
            </TabContainer>
        </Container>
    );
};

export default Schedules;
