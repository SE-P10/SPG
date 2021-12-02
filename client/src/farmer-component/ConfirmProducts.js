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

function ConfirmProducts(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [productQ, setProductQ] = useState([
    { name: "Apple", quantity: "1" },
    { name: "Banana", quantity: "3" },
  ]);
  const [confirmedProductQ, setConfirmedProductQ] = useState([]);

  // prendo i prodotti e le quantita dal db (productQ)
  // copio i valori in confirmedProductQ
  // se cambia qualcosa con i Form Control modifico confirmedProductQ
  // invio confirmedProductQ al server

  useEffect(() => {
    setConfirmedProductQ(productQ);
  }, []);

  const handleConfirm = () => {
    // prodotti da mandare al db per delivery
    console.log(confirmedProductQ.filter((p) => p.quantity > 0));
  };

  const changeQ = (ev, name) => {
    setConfirmedProductQ((old) =>
      old.map((o) => {
        if (o.name == name)
          return {
            name: name,
            quantity: ev.target.value,
          };
        else return o;
      })
    );
    console.log(name, ev.target.value);
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
                          changeQ(ev, p.name);
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
