import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TabContainer from 'react-bootstrap/TabContainer';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import { selectToken, selectRole } from '../state/Auth';
import { selectSchedules } from '../state/Schedules';

import Schedule from '../components/Schedule';

// https://github.com/LassiHeikkila/taskey/blob/main/pkg/types/schedule.go

const Schedules = () => {
    const token = useSelector(selectToken);
    const schedules = useSelector(selectSchedules);

    return (
        <Container>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Schedules</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                </Navbar.Collapse>
            </Navbar>
            <TabContainer >
                {schedules.map((schedule) => (
                <Row key={schedule.machineName}>
                    <Col sm={2}>
                        <Nav variant="pills" defaultActiveKey='' className='flex-column'>
                            <Nav.Item key={schedule.machineName}>
                                <Nav.Link eventKey={schedule.machineName}>{schedule.machineName}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <TabContent>
                            <TabPane eventKey={schedule.machineName}>
                                <Schedule schedule={schedule} />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
                ))}
            </TabContainer>
        </Container>
    );
};

export default Schedules;
