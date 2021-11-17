import {
    Button,
    Alert,
    Form,
    Row,
    Col,
    Dropdown,
    DropdownButton,
    Container,
  } from "react-bootstrap";
  import { useState } from "react";
  import { useEffect } from "react";
  import "../css/custom.css";
  import AFApi from "../api/a-API";
  import gAPI from "../gAPI";
  
  function ClientOrder(props) {
    useEffect(() => {
      const fillTables = async () => {
        const productsTmp = await gAPI.getProducts();
        setProducts(productsTmp);
        //Chiamare API che prende backet
        
      };
  
      fillTables();
    }, []);
  
    const handleSubmit = async (event, propsN) => {

 
        let orderOk = true;
        for (let elem of orderProduct) {
          let quantityAvailable = products
            .filter((t) => t.id === elem.product_id)
            .map((t) => t.quantity);
          if (quantityAvailable < elem.quantity) {
            setErrorMessage(
              "You are trying to order more than the quantity available"
            );
            orderOk = false;
          }
          if (elem.quantity <= 0) {
            setErrorMessage("Quantity must be greater than 0");
            orderOk = false;
          }
        }
  
        if (orderProduct.length === 0) {
          setErrorMessage("Can't issue an order without items.");
          orderOk = false;
        }
  
        if (orderOk) {
          
            //Chiamare API , moemntanemtnate stampare l'ordine

            propsN.addMessage("Request sent correctly!")
            propsN.changeAction(0);
        }
      
    };
  
    const [errorMessage, setErrorMessage] = useState("");
    const [products, setProducts] = useState([]);
    const [orderProduct, setOrderProduct] = useState([]);
  
    

    return (
      <>
      
        <Container className='justify-content-center cont'>
        <Row className='justify-content-center'>
            <h2>Basket</h2>
        </Row>
        
            {console.log(orderProduct)}
            {orderProduct.filter(t => t.quantity !== 0 && t.confirmed == true).map(p => 
                <Row>product : {p.name} quantity : {p.quantity} </Row>
                )
            }
            
          
          <Row className='justify-content-center'>
            <h2>Issue Order</h2>
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
          <Form>
            
  
            <h3 className='thirdColor'> List of our products: </h3>
            <Col className='below list'>
              {products.map((p) => (
                <Row className='below'>
                  <Col>{p.name} </Col>
                  <Col>{p.price} €</Col>
                  <Col>max quantity : {p.quantity}</Col>


                  {orderProduct.filter(t => t.product_id === p.id && t.confirmed == true).length === 0 ? <Button  onClick={
                      (ev) => {
                          if (orderProduct.filter(t => t.product_id === p.id).length === 0 || orderProduct.filter(t => t.product_id === p.id)[0].quantity > p.quantity || orderProduct.filter(t => t.product_id === p.id)[0].quantity <= 0  ) setErrorMessage("Wrong quantity")
                          else {
                              //chiamare API
                            setOrderProduct( (old) => {
                                const list = old.map( (item) => {
                                    if (item.product_id === p.id) return {product_id : p.id , confirmed : true, quantity : item.quantity, name : p.name};
                                    else return item;
                                });
                                return list;
                            })

                          }
                      }
                  }  variant="outline-secondary">ADD</Button> : <Button  onClick={
                    (ev) => {
                        
                          setOrderProduct( (old) => {
                              return old.filter(t => t.product_id !== p.id);
                              //chiamare API
                          })

                        }
                    
                }  variant="outline-secondary">DELETE</Button>  }


                  <Col>
                  {orderProduct.filter(t => t.product_id === p.id && t.confirmed == true).length === 0 ?<Form.Group><Form.Control onChange={ (ev) => {


                     
                      if (orderProduct.filter(t => t.product_id === p.id).length !== 0){setOrderProduct( (old) => {
                          const list = old.map( (item) => {
                              if (item.product_id === p.id) return {product_id : p.id , confirmed : item.confirmed, quantity : parseInt(ev.target.value), name : p.name};
                              else return item;
                          });
                          return list;
                      })}
                      else {
                          setOrderProduct((old)=> [{product_id : p.id , confirmed : false, quantity : parseInt(ev.target.value), name : p.name},...old])

                      }
                  }
                  } id={p.id} size='sm'/></Form.Group> : ""}</Col>




                </Row>
              ))}






            </Col>
  
            <Button
              className='se-button btn-block below'
              onClick={(ev) => handleSubmit(ev, props)}>
              Issue Order
            </Button>
          </Form>
        </Container>
      </>
    );
  }
  
  export { ClientOrder };
  