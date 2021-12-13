import { Alert, Row, Col, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { SearchComponent } from "./SearchComponent";
import API from "./../API";
import "../css/custom.css";

function CheckOrders(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (email) => {
    let ordersTmp = [];
    if (orders.length !== 0) setOrders([]);
    ordersTmp =  API.getOrders(email);
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
            <h3 className='thirdColor'> List of orders </h3>
          ) : (
            ""
          )}
        </Row>
        <Table responsive size='sm'>
          <thead>
            <th>Id</th>
            <th>Price</th>
            <th>Status</th>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className='over'>
                <td> {order.id}</td>
                <td> {order.price}</td>
                <td> {order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
}
export { CheckOrders };
