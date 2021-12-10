import "../css/custom.css";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion'
import "../css/custom.css";

const MailBox = (props) => {


    //Logica per la visione della accordition a seconda del proprio status.
    let statusClass = null
    switch (props.mail ? props.mail.seen : "0") {
        case '0':
            statusClass = 'danger';
            break;
        case '1':
            statusClass = 'light';
            break;
        default:
            statusClass = "danger"
            break;
    }
    return (
        <Container>
            <Row>
                <Col sm>Subject</Col>
                <Col sm>From</Col>
                <Col sm>To</Col>
            </Row>
            <Row>
                {props.mail ? props.mail.map((m) => (
                    
                    <Accordion>
                        <Accordion.Item eventKey={props.mail.id} bg={statusClass}>
                            <Accordion.Header>
                                <Col sm={8}>{props.mail.subjects}</Col>
                                <Col sm={4}>Icon</Col>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>From: {props.mail.from}</Row>
                                <Row>To: {props.mail.to}</Row>
                                <Row>Data: {props.mail.data}</Row>
                                <Row>{props.mail.content}</Row>
                            </Accordion.Body>
                            <Accordion.Button onClick={() => { props.messageSeen(m.id) }} />
                        </Accordion.Item>
                    </Accordion>
                )) : null
                }
            </Row>
        </Container>
    )
}

export { MailBox };
