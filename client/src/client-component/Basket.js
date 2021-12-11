import API from "../API";
import { basketIcon } from "../ui-components/Icons";
import {
    Button,
    Row,
  } from "react-bootstrap";
  import { useEffect , useState} from "react";
function Basket(props){
  const [basket,setBasket] = useState([])
  useEffect(() => {
    const fillTables = async () => {
      
      //Chiamare API che prende backet
      //{product_id : p.id , confirmed : true, quantity : item.quantity, name : p.name}
      const basketTmp = await API.getBasketProducts(props.setIsOrderProductDirtyOk);
      setBasket(
        basketTmp.map((t) => ({
          product_id: t.id,
          quantity: t.quantity,
          name: t.name,
        }))
      );
    };

    fillTables();
  }, [props.changes]);

    return(
        <>
        <Row>
          <h2>Basket {basketIcon}</h2>
        </Row>
        {basket.length !== 0 ? (
          <>
            {basket
              .filter((t) => t.quantity !== 0 )
              .map((p) => (
                <>
                  <Row>
                    {p.name} Q: {p.quantity}{" "}
                    <Button
                      onClick={(ev) => {
                        API.insertProductInBasket({
                          product_id: p.product_id,
                          quantity: 0,
                        }).then((e) => {
                            props.setIsOrderProductDirty(false);
                            props.setOrderProduct((old) => {
                            return old.filter((t) => t.product_id !== p.id);
                          });
                        });
                      }}
                      variant='outline-secondary'>
                      DELETE
                    </Button>
                  </Row>
                </>
              ))}{" "}
          </>
        ) : (
          <>
            {" "} 
              <>Basket is empty!</>
          </>
        )}
        <Row>
          <Button
            className='spg-button  mx-auto below'
            onClick={(ev) => props.handleSubmit(ev, props.props)}>
            Issue Order
          </Button>
        </Row>


        </>

    )



}


export {Basket};