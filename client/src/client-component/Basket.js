import API from "../API";
import { basketIcon } from "../ui-components/Icons";
import { Button, Row, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

function Basket(props) {
  const [basket, setBasket] = useState([]);
  const [update, setUpdate] = useState(false);
  const [basketLoading,setBasketLoading] = useState(true)
  useEffect(() => {
    const fillTables = async () => {
      //Chiamare API che prende backet
      //{product_id : p.id , confirmed : true, quantity : item.quantity, name : p.name}
      const basketTmp = await API.getBasketProducts();
      setBasket(
        basketTmp.map((t) => ({
          product_id: t.id,
          quantity: t.quantity,
          name: t.name,
        }))
      );
      setBasketLoading(false)
    };

    fillTables();
  }, [update,props.changes]);

  return (
    <>
      <Row>
        <h2>Basket {basketIcon}</h2>
      </Row>
      <Table responsive size='sm'>
        {basketLoading || props.isBasketLoading ? (
          <Spinner animation='border' variant='success' size='sm'></Spinner>
        ) : (
          <>
            {basket.length !== 0 ? (
              <>
                {basket
                  .filter((t) => t.quantity !== 0)
                  .map((p) => (
                    <>
                      <tr>
                        <td> {p.name} </td> <td> Q: {p.quantity} </td>
                        <td>
                          <Button
                            onClick={async (ev) => {
                              API.insertProductInBasket({
                                product_id: p.product_id,
                                quantity: 0,
                              }).then((e) => {
                                setBasketLoading(true)
                                setUpdate((old) => !old);
                                props.setOrderProduct((old) => {
                                  return old.filter(
                                    (t) => t.product_id !== p.id
                                  );
                                });
                              });
                            }}
                            className='spg-button'>
                            DELETE
                          </Button>
                        </td>
                      </tr>
                    </>
                  ))}{" "}
              </>
            ) : (
              <>
                {" "}
                <>Basket is empty!</>
              </>
            )}{" "}
          </>
        )}
      </Table>
      <Row>
        <Button
          className='spg-button  mx-auto below'
          onClick={(ev) => props.handleSubmit(ev, props.props)}>
          Issue Order
        </Button>
      </Row>
    </>
  );
}

export { Basket };
