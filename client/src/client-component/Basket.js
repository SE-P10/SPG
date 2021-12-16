import API from "../API";
import { basketIcon } from "../ui-components/Icons";
import { Button, Spinner, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function Basket(props) {

  const [basket, setBasket] = useState([]);
  const [update, setUpdate] = useState(false);
  const [basketLoading, setBasketLoading] = useState(true);

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

  }, [update, props.changes]);

  return (
    <Card className={"im-basket " + (props.className || '')} style={{...(props.style || {})}}>
      <Card.Header as="h4" className="d-flex"><div className=" mx-auto">Basket <div className="im-svg-icon" style={{ width: '30px', height: '30px' }}>{basketIcon}</div></div> </Card.Header>
      <Card.Body>
        <Card.Text>
          {basketLoading || props.isBasketLoading ?
            <Spinner animation='border' variant='success' size='sm'></Spinner>
            :
            <>
              {basket.length !== 0 ?
                <>
                  {
                    basket
                      .filter((t) => t.quantity !== 0)
                      .map((p) => {

                        return (

                          <div className="im-row">
                            {p.quantity} {p.name}
                            <Button
                              className='im-button im-animate'
                              onClick={async (ev) => {
                                API.insertProductInBasket({
                                  product_id: p.product_id,
                                  quantity: 0,
                                }).then((e) => {
                                  setBasketLoading(true)
                                  setUpdate((old) => !old);
                                });
                              }}
                            >
                              DELETE
                            </Button>
                          </div>
                        )
                      })
                  }
                </>
                :
                <span>Empty!</span>
              }
            </>
          }
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex">
        <Button
          className='im-button im-animate'
          onClick={(ev) => props.handleSubmit(ev, props.props)}>
          Issue Order
        </Button>
      </Card.Footer>
    </Card>
  );
}

export { Basket };
