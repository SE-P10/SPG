import { Alert, Form, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { SearchComponent } from "./SearchComponent";

function CheckOrders(props) {
  const [orders, setOrders] = useState([
    { id: 1, status: "NotHandOut", price: 3, date: "01-01-2021" },
    { id: 2, status: "HandOut", price: 3, date: "01-01-2021" },
    { id: 3, status: "NotHandOut", price: 3, date: "01-01-2021" },
    { id: 4, status: "NotHandOut", price: 3, date: "01-01-2021" },
  ]);
  const [idUser, setIdUsers] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (email) => {
    // order Id = API GetOrdersByEmail(email)
    //setIdUsers(Id);
    if (idUser === -1) {
      setErrorMessage("user not found");
    } else {
      //let ordersTmp = API.getOrdersById(idUser)
      //setOrders(ordersTmp)
    }
  };

  return (
    <Container>
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
          <h3 className='thirdColor'> List of the pendind orders </h3>{" "}
        </Row>
        {orders.map((order) => (
          <Row>
            <Col> id : {order.id}</Col>
            <Col> date : {order.date}</Col>
            <Col>price : {order.price}</Col>
          </Row>
        ))}
      </Col>
    </Container>
  );
}
export { CheckOrders };
