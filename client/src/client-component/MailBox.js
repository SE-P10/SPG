import "../css/custom.css";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "../css/custom.css";

const MailBox = (props) => {

    return (
        <Container>
            <Row>
                <Col sm>Subject</Col>
                <Col sm>From</Col>
                <Col sm>To</Col>
            </Row>
            <Row>
                {props.mail.map((m) => (
                    <Accordion>
                        <Accordion.Item eventKey={props.mail.id}>
                            <Accordion.Header>
                                <Col sm={8}>{props.mail.subjects}</Col>
                                <Col sm={4}>Valid/Not Valid</Col>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Row>From: {props.mail.from}</Row>
                                <Row>To: {props.mail.to}</Row>
                                <Row>Data: {props.mail.data}</Row>
                                <Row>{props.mail.content}</Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </Row>
        </Container>
    )
}

export { MailBox };
