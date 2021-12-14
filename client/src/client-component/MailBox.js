import "../css/custom.css";
import { Container, Table, Modal, Button } from "react-bootstrap";
import React, { useState } from 'react';

const MailBox = (props) => {

    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        console.log(props.mails.filter((m) => { return m.id === id})[0])
        setMessage(props.mails.filter((m) => { return m.id === id})[0])
        props.messageSeen(id);
        setShow(true);
    }

    return (
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th key={1}>From</th>
                        <th key={2}>To</th>
                        <th key={3}>Object</th>
                    </tr>
                </thead>
                <tbody >
                    {props.mails ? props.mails.map((m) => (
                        <tr className={m.seen===0? "bg-info text-white" : "bg-light text-dark"}>
                            <td>{m.id}</td>
                            <td >info@SPG.com</td>
                            <td >{props.user.email}</td>
                            <td >{m.object}</td>
                            <td >
                                <Button onClick = {() => handleShow(m.id)}>
                                    ReadMe!
                                </Button>
                            </td>
                        </tr>
                    )) : null}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{message? message.object : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message? message.message : null}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export { MailBox };
