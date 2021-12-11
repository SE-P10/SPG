import { Row, Col, Button, Container, Spinner } from "react-bootstrap";
import { useState } from "react";

import { useEffect } from "react";
import API from "./../API";
import "../css/custom.css";

function YourOrders(props) {
  const [orders, setOrders] = useState([]);
  const [isOrderListDirty, setIsOrderListDirty] = useState(true);
  const [isOrderListLoading, setIsProductListLoading] = useState(true);

  useEffect(() => {
    const fillOrders = async () => {
      let ordersTmp = await API.getOrders(props.user.email);
      setIsProductListLoading(false);
      if (ordersTmp.length === 0) {
      } else {
        setOrders(ordersTmp);
        setIsOrderListDirty(false);
      }
    };
    fillOrders();
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
                        {order.status == 'booked' ? <Button className='spg-button' onClick={() =>  props.modifyOrder(order.id)} >Modify </Button> : ""}
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
