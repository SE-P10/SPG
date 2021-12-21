import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { SearchComponent } from "../ui-components/SearchComponent";
import { BlockTitle, PageSection } from "../ui-components/Page";

import API from "../API";
import { ToastNotification } from "../ui-components/ToastNotification";

function HandOut(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handOutOrder = async (orderId) => {
    //API.handOutOrder(orderId)
    let esito = await API.handOutOrder(orderId);
    if (esito) props.addMessage("Order hands out correctly!");
    else setErrorMessage("Problem with the server");
    //API.updateOrder(idUser[0].id,[],{id:orderId, status: 'HandOut'}).then( () => props.addMessage("Order hands out correctly!")).catch((err) =>  setErrorMessage("Problem with the server") )

    props.changeAction(0);
  };

  const handleSearch = (email) => {
    if (!email) setErrorMessage("You have to insert an email!");
    else {
      let ordersTm = [];
      setOrders(ordersTm);
      API.getOrders(email, true)
        .then((ordersTml) => {
          if (ordersTml.length === 0) setErrorMessage("No orders found");
          else {
            setOrders(ordersTml);
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
    <PageSection>
      <BlockTitle>
        Hand out an Order
      </BlockTitle>
      <ToastNotification variant='error' onSet={() => setErrorMessage("")} message={errorMessage} />
      <Row>
        <SearchComponent className='mx-auto' handleSearch={handleSearch} />
      </Row>
      <Col className='below'>
        {orders
          .filter((t) => t.status === "confirmed")
          .map((order) => (
            <Row className='below'>
              <Col> id : {order.id}</Col>
              <Col>price : {order.price < 0.01 ? 0 : order.price}</Col>
              <Col>status : {order.status}</Col>
              <Col>
                <Button
                  className='im-button im-animate'
                  onClick={() => {
                    handOutOrder(order.id);
                  }}>

                  hand out
                </Button>
              </Col>
            </Row>
          ))}
      </Col>
    </PageSection>
  );
}
export { HandOut };
