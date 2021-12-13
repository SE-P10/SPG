import {
  Alert,
  Form,
  Row,
  Button,
  Container,
  Table,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";

import { useEffect } from "react";
import API from "./../API";
import "../css/custom.css";
function ConfirmProducts(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedProductQ, setConfirmedProductQ] = useState([]);
  const [productQ, setProductQ] = useState([]);
  const [confirmedQ, setConfirmedQ] = useState([]);
  // prendo i prodotti e le quantita dal db (productQ)
  // copio i valori in confirmedProductQ
  // se cambia qualcosa con i Form Control modifico confirmedProductQ
  // invio confirmedProductQ al server

  useEffect(() => {
    const productOrdered = async () => {
      const productsTmp = await API.getFarmerOrders(props.user.id);
      setProductQ(productsTmp);
      setConfirmedProductQ(productsTmp);
    };
    productOrdered();

    const confirmedQ = async () => {
      const confirmedQ = await API.getFarmerOpenDeliveries();
      console.log(confirmedQ);
      setConfirmedQ(confirmedQ);
    };
    confirmedQ();
  }, []);

  const handleConfirm = async () => {
    // prodotti da mandare al db per delivery
    //API.confirmFarmerOrder()
    let result;
    for (let product of confirmedProductQ) {
      result = await API.confirmFarmerOrder(product.id, product.quantity);
      console.log(result);
    }
    props.addMessage("Confirmation ok");
    props.changeAction(0);
  };

  const changeQ = (ev, p) => {
    setConfirmedProductQ((old) =>
      old.map((o) => {
        if (o.id === p.id)
          return {
            id: p.id,
            quantity: parseInt(ev.target.value),
            product: o.product,
            unit: o.unit,
          };
        else return o;
      })
    );
  };

  const getQuantityConfirmed = (id) => {
    console.log(confirmedQ);
    if (!confirmedQ) return 0;
    if (!confirmedQ.some((e) => e.product === id)) return 0;
    return confirmedQ.find((e) => e.product === id).quantity;
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
            <Table responsive size='sm' className='below'>
              <thead>
                <th>Name </th>

                <th>Ordered </th>

                <th> Confirmed </th>

                <th> Confirm</th>
              </thead>
              <tbody>
                {productQ
                  .filter((t) => t.quantity > 0)
                  .map((p) => (
                    <>
                      <tr>
                        <td>{p.product} </td> <td>{p.quantity} </td>{" "}
                        <td> {getQuantityConfirmed(p.id)} </td>
                        <td>
                          <Form.Control
                            defaultValue={p.quantity}
                            type='number'
                            min={0}
                            max={p.quantity}
                            onChange={(ev) => {
                              changeQ(ev, p);
                            }}></Form.Control>{" "}
                        </td>
                      </tr>{" "}
                    </>
                  ))}
              </tbody>
            </Table>
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
