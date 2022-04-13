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
    );
};

export default Schedules;
