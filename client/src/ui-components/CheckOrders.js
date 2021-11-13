import { Alert, Form, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { SearchComponent } from "./SearchComponent";
import API from "./../API"
import "../css/custom.css";

function CheckOrders(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (email) => {
    let ordersTmp = [];
    ordersTmp = await API.getOrders(email);
    if (ordersTmp.length === 0) {
      setErrorMessage("No orders found for this user.");
    } else {
      setOrders(ordersTmp);
    }
  };

  return (
    <Container className='cont'>
      <Row className='justify-content-center'>
        {" "}
        <h2> Check Orders</h2>{" "}
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
        <SearchComponent className='mx-auto' handleSearch={handleSearch} />{" "}
      </Row>

      <Col>
        <Row className='justify-content-center'>
          {orders.length !== 0 ? (
            <h3 className='thirdColor'> List of the pendind orders </h3>
          ) : (
            ""
          )}
        </Row>
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
export { CheckOrders };
