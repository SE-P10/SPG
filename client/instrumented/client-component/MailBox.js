import { Container, Table, Modal, Button } from "react-bootstrap";
import React, { useState } from 'react';
import { PageSection, BlockTitle } from "../ui-components/Page";

const MailBox = (props) => {

    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setMessage(props.mails.filter((m) => { return m.id === id })[0])
        props.messageSeen(id);
        setShow(true);
    }

    return (
        <PageSection>
            <BlockTitle>Notifications:</BlockTitle>
            <Container className="im-container--padding">
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
                            <tr className={m.seen === 0 ? "bg-info text-white" : "bg-light text-dark"}>
                                <td>{m.id}</td>
                                <td >info@SPG.com</td>
                                <td >{props.user.email}</td>
                                <td >{m.object}</td>
                                <td >
                                    <Button
                                        className='im-button im-animate'
                                        onClick={() => handleShow(m.id)}>
                                        ReadMe!
                                    </Button>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>
            </Container>
            <Modal show={show} onHide={handleClose} className="im-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{message ? message.object : ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message ? message.message : ""}</Modal.Body>
                <Modal.Footer>
                    <Button 
                     className='im-button im-animate'
                     variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </PageSection>
    )
}

export { MailBox };
