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
import React, { useState } from "react";
import { useEffect } from "react";
import "../css/custom.css";
import farmerAPI from "./../api/farmer";
import gAPI from "../api/gAPI";

function UpdateAvailability(props) {
  useEffect(() => {
    const fillTables = async () => {
      //const productsTmp = await gAPI.getProducts();
      //mettere questa chiamata API e togliere la precedwente
      const productsTmp = await farmerAPI.getFarmerProducts(props.user.id);
      setProducts(productsTmp);
    };

    fillTables();
  }, []);

  const handleSubmit = async (event, propsN) => {
    //fare parseInt
    let orderOk = true;
    console.log(orderProduct)
    if (orderProduct.length === 0)  {
      setErrorMessage("you have not updated any  items.");
      orderOk = false;
    }

    let checkNoWrongQuantity = orderProduct.filter(t => t.quantity < 0 ).length;
    if (checkNoWrongQuantity > 0) {
      setErrorMessage("you have negative quantities.");
      orderOk = false;
    }

    if (orderOk) {
      for (let i of orderProduct) {
        let esito = await farmerAPI.updateFarmerProducts(
          i.product_id,
          i.quantity,
          props.user.id
        );
      }
      propsN.addMessage("Request sent correctly!");

      propsN.changeAction(0);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [errorQuantity,setErrorQuantity] = useState(false);
  const [orderProduct, setOrderProducts] = useState([]);
  const [selectedPs, setSelectPs] = useState([]);

  const selectProduct = (id) => {
    if (selectedPs.indexOf(id) == -1) {
      setOrderProducts((old) => [...old, { product_id: id, quantity: 0 }]);
      setSelectPs((selectedPsn) => [...selectedPsn, id]);
    } else {
      setSelectPs((old) =>
        old.filter((p) => {
          return p != id;
        })
      );

      setOrderProducts((old) => old.filter((p) => p.product_id !== id));
    }
  };

  return (
    <>
      <Container className='justify-content-center cont'>
        <Row className='justify-content-center'>
          <h2>Update Availability</h2>
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
          <Col className='below list over'>
            {products.map((p) => (
              <Row className='over'>
                <Col>{p.name} </Col>
                <Col>Actual quantity : {p.quantity} </Col>
                <Form.Group>
                  {" "}
                  <Form.Check
                    inline
                    id="CheckBoxItem" 
                    onClick={() => selectProduct(p.id)}>
                    </Form.Check>
                    {" "}
                    {selectedPs.indexOf(p.id) !== -1 ? (
                    <>
                      {" "}
                      Q:
                      <Form.Control
                        defaultValue={0}
                        type='number'
                        inline
                        onChange={(ev) => {
                          if (parseInt(ev.target.value) < 0)
                            {
                              setErrorMessage("Wrong quantity");
                              setOrderProducts((old) => {
                                const list = old.map((item) => {
                                  if (item.product_id === p.id)
                                    return {
                                      product_id: p.id,
                                      quantity: parseInt(ev.target.value),
                                    };
                                  else return item;
                                });
                                return list;
                              });
                              
                              
                            }
                          else if (isNaN(parseInt(ev.target.value)))
                            {
                              setErrorMessage("Wrong quantity");
                              setOrderProducts((old) => {
                                const list = old.map((item) => {
                                  if (item.product_id === p.id)
                                    return {
                                      product_id: p.id,
                                      quantity: parseInt(ev.target.value),
                                    };
                                  else return item;
                                });
                                return list;
                              });
                            }
                          else {
                            setOrderProducts((old) => {
                              const list = old.map((item) => {
                                if (item.product_id === p.id)
                                  return {
                                    product_id: p.id,
                                    quantity: parseInt(ev.target.value),
                                  };
                                else return item;
                              });
                              return list;
                            });
                          }
                        }}
                        id={p.id}
                        size='sm'></Form.Control>{" "}
                    </>
                  ) : null}
                </Form.Group>
              </Row>
            ))}
          </Col>

          {errorQuantity === false ?<Button
            className='se-button btn-block fixed-height below'
            onClick={(ev) => handleSubmit(ev, props)}>
            Issue Order
          </Button> : ""}
        </Form>
      </Container>
    </>
  );
}

export { UpdateAvailability };
