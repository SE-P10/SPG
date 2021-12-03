import { Row, Col, Container, Button } from "react-bootstrap";
import { useState } from "react";

import { useEffect } from "react";
import API from "./../API";
import notificationAPI from "./../api/notification"
import "../css/custom.css";
import { MailBox } from "./MailBox";
import ordersApi from "../api/orders";

function ClientNotifications(props) {
    const [mails, setMails] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([])
    const [userWallet, setUserWallet] = useState([])



    useEffect(() => {
        const fillMailBox = async () => {
            const mails = await notificationAPI.getNotification(props.user.id);
            setMails(mails);
        };

        fillMailBox().catch((err) => {
            setMails([]);
        });
    }, []);

    useEffect(() => {
        const fillTable = async () => {
            const orders = await ordersApi.getPendingOrders();
            const wallet = await API.getWalletByMail(props.user.mail);
            setUserWallet(wallet);
            setPendingOrders(orders.filter((o) => {return o.user.id === props.user.id;} ));
        };

        fillTable().catch((err) => {
            setUserWallet([]);
            setPendingOrders([]);
        });
    }, [props.user]);

    return (
        <>
            <Container>
                <Row>
                    <Col sm={8}>
                        <MailBox mails={mails} />
                    </Col>
                    <Col sm={4}>
                        <h1>Generic information:</h1>
                        <h2>Pending Orders</h2>
                        {pendingOrders.length === 0 ?
                            <h3> No pending Orders </h3>
                            : pendingOrders.map((pO) => (
                                <Row className='over'>
                                    <Col>id : {pO.id}</Col>
                                    <Col>price : {pO.price}</Col>
                                </Row>
                            ))}
                        <h2>Your wallet</h2>
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
