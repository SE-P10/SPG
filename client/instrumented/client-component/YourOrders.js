import {
  Row,
  Col,
  Button,
  Container,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import API from "./../API";
import "../css/custom.css";

function YourOrders(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOrderListDirty, setIsOrderListDirty] = useState(true);
  const [isOrderListLoading, setIsProductListLoading] = useState(true);

  useEffect(() => {
    const fillOrders = async () => {
      let ordersTmp = await API.getOrders(props.user.email);
      setIsProductListLoading(false);
      if (ordersTmp.length === 0) {
        setErrorMessage("No orders found for this user.");
      } else {
        setOrders(ordersTmp);
        setIsOrderListDirty(false);
      }
    };
    fillOrders();
    console.log(props.user.email);
  }, [isOrderListDirty]);

  return (
    <>
      <Col className='cont'>
        <Row className='justify-content-center'>
          {isOrderListLoading ? (
            <Container className='below'>
              <Spinner animation='border' variant='success'></Spinner>
            </Container>
          ) : (
            <>
              {orders.length !== 0 ? (
                <>
                  <Col>
                    <Row>
                      {" "}
                      <h3 className='thirdColor mx-auto'>
                        {" "}
                        List of your orders{" "}
                      </h3>{" "}
                    </Row>
                    {orders.map((order) => (
                      <Row className='over'>
                        <Col> id : {order.id}</Col>
                        <Col>price : {order.price}</Col>
                        <Col>status : {order.status}</Col>
                      </Row>
                    ))}{" "}
                  </Col>
                </>
              ) : (
                <>
                  <h3 className='below'>
                    {" "}
                    No orders found! Purchaise a &ensp;
                    <Button
                      className='spg-button'
                      onClick={() => props.changeAction(2)}>
                      {" "}
                      New Order{" "}
                    </Button>
                  </h3>
                </>
              )}{" "}
            </>
          )}
        </Row>
      </Col>
    </>
  );
}
export { YourOrders };
