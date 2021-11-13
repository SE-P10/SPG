import { useState } from "react";
import { Container, Row, Alert, Col, Button } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { useEffect } from "react";
import API from "./../API"
function HandOut(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handOutOrder = (orderId) => {
    //API.handOutOrder(orderId)
    props.addMessage("Order hands out correctly!");

    props.changeAction(0);
  };

  const handleSearch = async (email) => {
    let ordersTmp = [];
    ordersTmp =  await API.getOrders(email)
    if (ordersTmp.length === 0) {
      setErrorMessage("No orders found");
    } else {
      setOrders(ordersTmp)
    }
  };

  return (
    <Container>
      <Row className='justify-content-center'>
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
          .filter((t) => t.status !== "HandOut")
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
