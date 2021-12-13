import { Alert, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import API from "../API";
import "../css/custom.css";

function PendingOrders(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fillTables = async () => {
      const ordersTmp = await  API.getPendingOrders();
      setOrders(ordersTmp);
    };

    fillTables();
  }, []);


  return (
    <Container className='cont'>
      <Row className='justify-content-center'>
        {" "}
        <h2> Pending Orders</h2>{" "}
      </Row>
      {errorMessage ? (
        <Alert variant='danger' onClose={() => setErrorMessage("")} dismissible>
          {" "}
          {errorMessage}{" "}
        </Alert>
      ) : (
        ""
      )}


      <Col>
        <Row className='justify-content-center'>
          {orders.length !== 0 ? (
            <h3 className='thirdColor'> List of the pendind orders </h3>
          ) : (
            ""
          )}
        </Row>
        {orders.length === 0 ? <h3>There are no pending orders</h3> : ""}
        {orders.map((order) => (
          <Row>
            <Col> id : {order.id}</Col>
            <Col>price : {order.price}</Col>
            <Col>status : {order.status}</Col>
          </Row>
        ))}
      </Col>
    </Container>
  );
}
export { PendingOrders };
