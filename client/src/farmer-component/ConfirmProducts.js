import {
  Alert,
  Form,
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchComponent } from "../ui-components/SearchComponent";
import { useEffect } from "react";
import API from "./../API";
import "../css/custom.css";
import ordersApi from "../api/orders";
function ConfirmProducts(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [productQ, setProductQ] = useState([]);
  const [confirmedProductQ, setConfirmedProductQ] = useState([]);

  // prendo i prodotti e le quantita dal db (productQ)
  // copio i valori in confirmedProductQ
  // se cambia qualcosa con i Form Control modifico confirmedProductQ
  // invio confirmedProductQ al server

  useEffect(() => {
    const productOrdered = async () => {
      const productsTmp = await ordersApi.getRequestedProducts(props.user.id);
      setProductQ(productsTmp);
    };

    console.log(props.user.id);
    productOrdered();

    setConfirmedProductQ(productQ);
  }, []);

  const handleConfirm = () => {
    // prodotti da mandare al db per delivery
    console.log(confirmedProductQ.filter((p) => p.quantity > 0));
  };

  const changeQ = (ev, p) => {
    setConfirmedProductQ((old) =>
      old.map((o) => {
        if (o.name == p.name)
          return {
            id: p.id,

            quantity: parseInt(ev.target.value),
            price: p.price,
            name: p.name,
          };
        else return o;
      })
    );
  };

  return (
    <>
      <Container className='justify-content-center cont'>
        <Row className='justify-content-center'>
          <h2>Confirm Products</h2>
        </Row>
        {errorMessage ? (
          <Alert
            variant='danger'
            onClose={() => setErrorMessage("")}
            dismissible>
            {" "}
            {errorMessage}{" "}
          </Alert>
        ) : (
          ""
        )}

        {productQ ? (
          <>
            <Col className='below'>
              <Row>
                <Col>
                  <h3>Name </h3>
                </Col>
                <Col>
                  {" "}
                  <h3>Ordered </h3>
                </Col>
                <Col>
                  <h3> Confirm</h3>
                </Col>
              </Row>{" "}
              {productQ.map((p) => (
                <>
                  <Row>
                    <Col>{p.name} </Col> <Col>{p.quantity} </Col>{" "}
                    <Col>
                      <Form.Control
                        defaultValue={p.quantity}
                        type='number'
                        min={0}
                        max={p.quantity}
                        onChange={(ev) => {
                          changeQ(ev, p);
                        }}></Form.Control>{" "}
                    </Col>
                  </Row>{" "}
                </>
              ))}
            </Col>
          </>
        ) : (
          <> No orders for you this week!</>
        )}
        <Button className='below btn-block spg-button' onClick={handleConfirm}>
          {" "}
          Confirm
        </Button>
      </Container>
    </>
  );
}
export { ConfirmProducts };
