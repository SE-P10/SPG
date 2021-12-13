import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from 'react';

import API from "./../API";
import notificationAPI from "./../api/notificationAPI"
import "../css/custom.css";
import { MailBox } from "./MailBox";
import ordersApi from "../api/orders";

function ClientNotifications(props) {

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
            const orders =  ordersApi.getPendingOrders();
            const mailsTmpy =  notificationAPI.getNotification(props.user.id);
            const wallet = await API.getWalletByMail(props.user.email);
            setUserWallet(wallet);
            setPendingOrders(orders.filter((o) => { return o.user_id === props.user.id; }));
            setMails(mailsTmpy);
            setDirtyMessage(false);
        };
        if (dirtyMessage) {
            fillTable().catch((err) => {
                console.log(err)
            })
        }
    }, [props.user, dirtyMessage]);

    return (
        <>
            <Container fluid className="vh-100">
                <Row >
                    <Col sm={8} className='justify-content-center cont '>
                        <MailBox mails={mails} messageSeen={messageSeen} user={props.user} />
                    </Col>
                    <Col sm={3} className='justify-content-center cont ml-5'>
                        <h1>Your Info:</h1>
                        <h2>Pending Orders:</h2>
                        {pendingOrders.length === 0 ?
                            <h3> No pending Orders </h3>
                            : pendingOrders.map((pO) => (
                                <Row className='over'>
                                    <Col sm>id : {pO.id}</Col>
                                    <Col sm>price : {pO.price}</Col>
                                </Row>
                            ))}
                        <h2>Your wallet:</h2>
                        <h3>{userWallet}</h3>
                        <h2>Amount to recharge: </h2>
                        <h3>{(pendingOrders.reduce((acc, curr) => acc + curr.price, 0) - userWallet) > 0 ?
                            pendingOrders.reduce((acc, curr) => acc + curr.price, 0) - userWallet :
                            'You have not to recharge your wallet'}
                        </h3>
                        {/*(pendingOrders.reduce((acc, curr) => acc + curr.price, 0) - userWallet) > 0 ? <Button></Button> : null*/}
                    </Col>

                </Row>
            </Container>
        </>
    )
}
export { ClientNotifications };
