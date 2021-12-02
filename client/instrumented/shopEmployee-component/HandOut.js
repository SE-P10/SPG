import { useState } from "react";
import { Container, Row, Alert, Col, Button } from "react-bootstrap";
import { SearchComponent } from "../ui-components/SearchComponent";
import { useEffect } from "react";

import API from "../API";
import "../css/custom.css";
import ordersApi from "../api/orders";

function HandOut(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [mailInserted, setMailInserted] = useState("");

  const handOutOrder = async (orderId) => {
    //API.handOutOrder(orderId)
    let esito = await ordersApi.handOutOrder(orderId);
    if (esito) props.addMessage("Order hands out correctly!");
    else setErrorMessage("Problem with the server");
    //ordersApi.updateOrder(idUser[0].id,[],{id:orderId, status: 'HandOut'}).then( () => props.addMessage("Order hands out correctly!")).catch((err) =>  setErrorMessage("Problem with the server") )

    props.changeAction(0);
  };

  const handleSearch = (email) => {
    if (!email) setErrorMessage("You have to insert an email!");
    else {
      let ordersTmp = [];
      setOrders(ordersTmp);
      API.getOrders(email)
        .then((ordersTmp) => {
          if (ordersTmp.length === 0) setErrorMessage("No orders found");
          else {
            setMailInserted(email);
            setOrders(ordersTmp);
            setErrorMessage("");
          }
        })
        .catch((e) => {
          console.log(e);
          setErrorMessage("No user found.");
        });
    }
  };

  return (
    <Container className='cont'>
      <Row className='justify-content-center cont'>
        {" "}
        <h2> Hand out an Order</h2>{" "}
      </Row>
      {errorMessage ? (
        <Alert variant='danger' onClose={() => setErrorMessage("")} dismissible>
          {" "}
          {errorMessage}{" "}
        </Alert>
      ) : (
        ""
      )}
      <Row>
        {" "}
        <SearchComponent className='mx-auto' handleSearch={handleSearch} />{" "}
      </Row>

      <Col className='below'>
        {orders
          .filter((t) => t.status !== "handout")
          .map((order) => (
            <Row className='below'>
              <Col> id : {order.id}</Col>
              <Col>price : {order.price}</Col>
              <Col>status : {order.status}</Col>
              <Col>
                <Button
                  className='spg-button'
                  onClick={() => {
                    handOutOrder(order.id);
                  }}>
                  {" "}
                  hand out{" "}
                </Button>
              </Col>
            </Row>
          ))}
      </Col>
    </Container>
  );
}
export { HandOut };