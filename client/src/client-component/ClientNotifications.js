import { Row, Col, Container, Button } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas'
import React, { useState, useEffect } from 'react';

import API from "./../API";
import notificationAPI from "./../api/notification"
import "../css/custom.css";
import { MailBox } from "./MailBox";
import ordersApi from "../api/orders";

function ClientNotifications(props) {

    //OffCanvas set
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [mails, setMails] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([])
    const [userWallet, setUserWallet] = useState([])
    //Viene settato a true quando ci sono operazioni alla quale deve seguire una reidratazione dello stato meme
    const [dirtyMessage, setDirtyMessage] = useState(true);

    //Modifica come messaggio visto
    const messageSeen = (notificationId) => {

        notificationAPI.setSeenNotification(notificationId)
        setDirtyMessage(true)

    };
    //Carico ogni volta che cambia l'utente le sue notifiche, i pendent order ed il suo wallet
    useEffect(() => {
        const fillTable = async () => {
            const orders = ordersApi.getPendingOrders();
            console.log(orders.filter((o) => { return o.user_id === props.user.id; }))
            //const mails = await notificationAPI.getNotification(props.user.id);
            const wallet = await API.getWalletByMail(props.user.email);
            setUserWallet(wallet);
            setPendingOrders(orders.filter((o) => { return o.user_id === props.user.id; }));
            //setMails(mails);
            setDirtyMessage(false);
        };
        fillTable().catch((err) => {
            console.log(err)
        })
    }, [props.user, dirtyMessage]);

    return (
        <>
            <Container fluid className="vh-100">
                <Row >
                    <Col sm={7} className='justify-content-center cont '>
                        <MailBox mails={mails} messageSeen={messageSeen} />
                    </Col>
                    <Col sm={4} className='justify-content-center cont ml-5'>
                        <h1>Your Info:</h1>
                        <h2>Pending Orders:</h2>
                        {pendingOrders.length === 0 ?
                            <h3> No pending Orders </h3>
                            : pendingOrders.map((pO) => (
                                <Row className='over'>
                                    <Col>id : {pO.id}</Col>
                                    <Col>price : {pO.price}</Col>
                                </Row>
                            ))}
                        <h2>Your wallet:</h2>
                        <h3>{userWallet}</h3>
                        <h2>Amount to recharge: </h2>
                        <h3>{(pendingOrders.reduce((acc, curr) => acc + curr.price, 0) - userWallet) > 0 ?
                            pendingOrders.reduce((acc, curr) => acc + curr.price, 0) - userWallet :
                            'You have not to recharge your wallet'}
                        </h3>
                        {(pendingOrders.reduce((acc, curr) => acc + curr.price, 0) - userWallet) > 0 ? <Button></Button> : null}
                    </Col>

                </Row>
            </Container>
        </>
    )
}
export { ClientNotifications };
