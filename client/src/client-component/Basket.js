import API from "../API";
import { basketIcon } from "../ui-components/Icons";
import { Button, Spinner, Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function Basket(props) {

  const [basket, setBasket] = useState([]);
  const [update, setUpdate] = useState(false);
  const [basketLoading, setBasketLoading] = useState(true);

  const [orderPriceAmount, setOrderPriceAmount] = useState(0);

  useEffect(() => {

    (async () => {

      const basketTmp = ((await API.getBasketProducts()) || []).filter((t) => t.quantity !== 0);

      let basketPrice = 0;

      for (let i = 0; i < basketTmp.length; i++) {
        basketPrice += basketTmp[i].price * basketTmp[i].quantity;
      }

      setBasketLoading(false);

      setOrderPriceAmount(basketPrice);

      setBasket(basketTmp);

    })();

  }, [update, props.changes]);


  const removeProduct = async (p) => {

    await API.insertProductInBasket({
      product_id: p.id,
      quantity: 0,
    });

    setBasketLoading(true);
    setUpdate(!update);

    if (props.handleChange) {
      props.handleChange(basket.filter(x => x.id !== p.id))
    }

  }

  return (
    <Card className={"im-basket " + (props.className || '')} style={{ ...(props.style || {}) }}>
      <Card.Header as="h4" className="d-flex"><div className=" mx-auto">Basket <div className="im-svg-icon" style={{ width: '30px', height: '30px' }}>{basketIcon}</div></div> </Card.Header>
      <Card.Body>
        <Card.Text>
          {basketLoading ?
            <Spinner animation='border' variant='success' size='sm'></Spinner>
            :
            <>
              {basket.length !== 0 ?
                <>
                  {
                    basket.map((product) => {

                      return (
                        <div className="im-row" key={product.id}>
                          <span>{product.quantity} {product.name}</span>
                          <Button
                            className='im-button im-animate'
                            onClick={() => { removeProduct(product) }}
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
      <Card.Footer className="d-flex justify-content-between">
        <span className="im-text">Total: {Math.round(orderPriceAmount * 100) / 100}€</span>
        <Button
          className='im-button im-animate'
          onClick={(ev) => {
            ev.preventDefault();
            if (props.handleSubmit) {
              props.handleSubmit(basket)
            }
          }
          }>
          Issue Order
        </Button>
      </Card.Footer>
    </Card>
  );
}

export { Basket };
