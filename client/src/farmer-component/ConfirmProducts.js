import {
  Alert,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";

import { PageSection, BlockTitle } from "../ui-components/Page";
import API from "./../API";

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

    const confirmedQe = async () => {
      const confirmedQo = await API.getFarmerOpenDeliveries();
      setConfirmedQ(confirmedQo);
    };
    confirmedQe();
  }, [props.user.id]);

  const handleConfirm = async () => {
    // prodotti da mandare al db per delivery
    for (let product of confirmedProductQ) {
       await API.confirmFarmerOrder(product.id, product.quantity);
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
    <PageSection>
      <BlockTitle >
        Confirm Products
      </BlockTitle>
      {errorMessage ? (
        <Alert
          variant='danger'
          onClose={() => setErrorMessage("")}
          dismissible>

          {errorMessage}
        </Alert>
      ) : (
        ""
      )}

      {productQ ? (
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
                    <td>{p.product} </td>
                    <td>{p.quantity} </td>
                    <td> {getQuantityConfirmed(p.id)} </td>
                    <td>
                      <Form.Control
                        defaultValue={p.quantity}
                        type='number'
                        min={0}
                        max={p.quantity}
                        onChange={(ev) => {
                          changeQ(ev, p);
                        }}></Form.Control>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </Table>
      ) : (
        <> No orders for you this week!</>
      )}
      <Button className='below im-button im-animate' onClick={handleConfirm}>
        Confirm
      </Button>
    </PageSection>
  );
}
export { ConfirmProducts };
