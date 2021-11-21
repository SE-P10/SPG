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
import gAPI from "../api/gAPI";
import API from "../API";
import { filterIcon, basketIcon } from "../ui-components/Icons";

function ClientOrder(props) {
  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await gAPI.getProducts();
      setProducts(productsTmp);
      const farmersTmp = productsTmp
        .map((t) => t.farmer)
        .filter(function (item, pos) {
          return productsTmp.map((t) => t.farmer).indexOf(item) == pos;
        });
      setFarmers(farmersTmp);
      const typesTmp = productsTmp
        .map((t) => t.name)
        .filter(function (item, pos) {
          return productsTmp.map((t) => t.name).indexOf(item) == pos;
        });
      setType(typesTmp);
      //Chiamare API che prende backet
      //{product_id : p.id , confirmed : true, quantity : item.quantity, name : p.name}
      const basketTmp = await API.getBasketProducts();
      setOrderProduct(
        basketTmp.map((t) => ({
          product_id: t.id,
          confirmed: true,
          quantity: t.quantity,
          name: t.name,
        }))
      );
    };

    fillTables();
  }, []);

  const handleSubmit = async (event, propsN) => {
    let orderOk = true;

    if (orderProduct.length === 0) {
      setErrorMessage("Can't issue an order without items.");
      orderOk = false;
    }

    if (orderOk) {
      API.deleteAllBasket();

      //Chiamare API , moemntanemtnate stampare l'ordine
      API.insertOrder(
        props.user.id,
        orderProduct.filter((t) => t.quantity !== 0)
      )
        .then(() => propsN.addMessage("Request sent correctly!"))
        .catch((err) => {
          setErrorMessage("Server error during insert order.");
        });

      propsN.addMessage("Request sent correctly!");
      propsN.changeAction(0);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [orderProduct, setOrderProduct] = useState([]);
  const [type, setType] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [viewFilter, setViewFilter] = useState(false);
  const [categorize, setCategorize] = useState(1); //0 per prodotti 1 per farmer
  const [filterCategorize, setFilterCategorize] = useState(undefined); //if farmer o tipo prodotto
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  return (
    <>
      <Col className='justify-content-center cont'>
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
        <Col sm={8}>
          <Button
            className='spg-button'
            onClick={() => {
              if (showFilterMenu) setShowFilterMenu(false);
              else setShowFilterMenu(true);
            }}>
            {" "}
            {filterIcon} Filters
          </Button>{" "}
          {showFilterMenu ? (
            <>
              {" "}
              <Button
                className='spg-button'
                onClick={() => {
                  setCategorize(2);
                  setFilterCategorize(undefined);
                  setViewFilter(true);
                }}>
                {" "}
                Show all{" "}
              </Button>{" "}
              <Button
                className='spg-button'
                onClick={() => {
                  setCategorize(0);
                  setFilterCategorize(undefined);
                  setViewFilter(true);
                }}>
                {" "}
                Show for type{" "}
              </Button>{" "}
              <Button
                className='spg-button'
                onClick={() => {
                  setCategorize(1);
                  setFilterCategorize(undefined);
                  setViewFilter(true);
                }}>
                {" "}
                Show for famer{" "}
              </Button>
            </>
          ) : null}
        </Col>
        {categorize === 0 && viewFilter === true ? (
          <div>
            {type.map((t) => (
              <Row>
                <Col>{t}</Col>
                <Col>
                  <Button
                    className='spg-button'
                    onClick={() => {
                      setFilterCategorize(t);
                      setViewFilter(false);
                    }}>
                    select
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        ) : (
          <div>
            {categorize == 1 && viewFilter === true ? (
              <div>
                {farmers.map((t) => (
                  <Row>
                    <Col>{t}</Col>
                    <Col>
                      <Button
                        variant='primary'
                        onClick={() => {
                          setFilterCategorize(t);
                          setViewFilter(false);
                        }}>
                        select
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        {filterCategorize !== undefined ? (
          <Form>
            <h3 className='thirdColor'> List of our products: </h3>
            <Col className='below list'>
              {products
                .filter((t) => {
                  return categorize === 0
                    ? t.name === filterCategorize
                    : t.farmer === filterCategorize;
                })
                .map((p) => (
                  <Row className='below'>
                    <Col>{p.name} </Col>
                    <Col>{p.price} €</Col>
                    <Col>max quantity : {p.quantity}</Col>

                    {orderProduct.filter(
                      (t) => t.product_id === p.id && t.confirmed == true
                    ).length === 0 ? (
                      <Button
                        onClick={(ev) => {
                          if (
                            orderProduct.filter((t) => t.product_id === p.id)
                              .length === 0 ||
                            orderProduct.filter((t) => t.product_id === p.id)[0]
                              .quantity > p.quantity ||
                            orderProduct.filter((t) => t.product_id === p.id)[0]
                              .quantity <= 0
                          )
                            setErrorMessage("Wrong quantity");
                          else {
                            console.log(
                              orderProduct
                                .filter((t) => t.product_id === p.id)
                                .map((t) => ({
                                  product_id: t.product_id,
                                  quantity: t.quantity,
                                }))[0]
                            );
                            API.insertProductInBasket(
                              orderProduct
                                .filter((t) => t.product_id === p.id)
                                .map((t) => ({
                                  product_id: t.product_id,
                                  quantity: t.quantity,
                                }))[0]
                            );
                            setOrderProduct((old) => {
                              const list = old.map((item) => {
                                if (item.product_id === p.id)
                                  return {
                                    product_id: p.id,
                                    confirmed: true,
                                    quantity: item.quantity,
                                    name: p.name,
                                  };
                                else return item;
                              });
                              return list;
                            });
                          }
                        }}
                        variant='outline-secondary'>
                        ADD
                      </Button>
                    ) : (
                      <Button
                        onClick={(ev) => {
                          API.insertProductInBasket(
                            orderProduct
                              .filter((t) => t.product_id === p.id)
                              .map((t) => ({
                                product_id: t.product_id,
                                quantity: 0,
                              }))[0]
                          );

                          setOrderProduct((old) => {
                            return old.filter((t) => t.product_id !== p.id);
                          });
                        }}
                        variant='outline-secondary'>
                        DELETE
                      </Button>
                    )}

                    <Col>
                      {orderProduct.filter(
                        (t) => t.product_id === p.id && t.confirmed == true
                      ).length === 0 ? (
                        <Form.Group>
                          <Form.Control
                            onChange={(ev) => {
                              if (isNaN(parseInt(ev.target.value)))
                                setErrorMessage("not a number");
                              else {
                                if (
                                  orderProduct.filter(
                                    (t) => t.product_id === p.id
                                  ).length !== 0
                                ) {
                                  setOrderProduct((old) => {
                                    const list = old.map((item) => {
                                      if (item.product_id === p.id)
                                        return {
                                          product_id: p.id,
                                          confirmed: item.confirmed,
                                          quantity: parseInt(ev.target.value),
                                          name: p.name,
                                        };
                                      else return item;
                                    });
                                    return list;
                                  });
                                } else {
                                  setOrderProduct((old) => [
                                    {
                                      product_id: p.id,
                                      confirmed: false,
                                      quantity: parseInt(ev.target.value),
                                      name: p.name,
                                    },
                                    ...old,
                                  ]);
                                }
                              }
                            }}
                            id={p.id}
                            size='sm'
                          />
                        </Form.Group>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                ))}
            </Col>

            <Button
              className='se-button btn-block below'
              onClick={(ev) => handleSubmit(ev, props)}>
              Issue Order
            </Button>
          </Form>
        ) : (
          <Form>
            <h3 className='thirdColor'> List of our products: </h3>
            <Col className='below list'>
              {products.map((p) => (
                <Row className='below'>
                  <Col>{p.name} </Col>
                  <Col>{p.price} €</Col>
                  <Col>max quantity : {p.quantity}</Col>

                  {orderProduct.filter(
                    (t) => t.product_id === p.id && t.confirmed == true
                  ).length === 0 ? (
                    <Button
                      onClick={(ev) => {
                        if (
                          orderProduct.filter((t) => t.product_id === p.id)
                            .length === 0 ||
                          orderProduct.filter((t) => t.product_id === p.id)[0]
                            .quantity > p.quantity ||
                          orderProduct.filter((t) => t.product_id === p.id)[0]
                            .quantity <= 0
                        )
                          setErrorMessage("Wrong quantity");
                        else {
                          console.log(
                            orderProduct
                              .filter((t) => t.product_id === p.id)
                              .map((t) => ({
                                product_id: t.product_id,
                                quantity: t.quantity,
                              }))[0]
                          );
                          API.insertProductInBasket(
                            orderProduct
                              .filter((t) => t.product_id === p.id)
                              .map((t) => ({
                                product_id: t.product_id,
                                quantity: t.quantity,
                              }))[0]
                          );
                          setOrderProduct((old) => {
                            const list = old.map((item) => {
                              if (item.product_id === p.id)
                                return {
                                  product_id: p.id,
                                  confirmed: true,
                                  quantity: item.quantity,
                                  name: p.name,
                                };
                              else return item;
                            });
                            return list;
                          });
                        }
                      }}
                      variant='outline-secondary'>
                      ADD
                    </Button>
                  ) : (
                    <Button
                      onClick={(ev) => {
                        API.insertProductInBasket(
                          orderProduct
                            .filter((t) => t.product_id === p.id)
                            .map((t) => ({
                              product_id: t.product_id,
                              quantity: 0,
                            }))[0]
                        );

                        setOrderProduct((old) => {
                          return old.filter((t) => t.product_id !== p.id);
                        });
                      }}
                      variant='outline-secondary'>
                      DELETE
                    </Button>
                  )}

                  <Col>
                    {orderProduct.filter(
                      (t) => t.product_id === p.id && t.confirmed == true
                    ).length === 0 ? (
                      <Form.Group>
                        <Form.Control
                          onChange={(ev) => {
                            if (isNaN(parseInt(ev.target.value)))
                              setErrorMessage("not a number");
                            else {
                              if (
                                orderProduct.filter(
                                  (t) => t.product_id === p.id
                                ).length !== 0
                              ) {
                                setOrderProduct((old) => {
                                  const list = old.map((item) => {
                                    if (item.product_id === p.id)
                                      return {
                                        product_id: p.id,
                                        confirmed: item.confirmed,
                                        quantity: parseInt(ev.target.value),
                                        name: p.name,
                                      };
                                    else return item;
                                  });
                                  return list;
                                });
                              } else {
                                setOrderProduct((old) => [
                                  {
                                    product_id: p.id,
                                    confirmed: false,
                                    quantity: parseInt(ev.target.value),
                                    name: p.name,
                                  },
                                  ...old,
                                ]);
                              }
                            }
                          }}
                          id={p.id}
                          size='sm'
                        />
                      </Form.Group>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              ))}
            </Col>

            <Button
              className='se-button btn-block below'
              onClick={(ev) => handleSubmit(ev, props)}>
              Issue Order
            </Button>
          </Form>
        )}
      </Col>
      <Col sm={4} className='ml-3'>
        <Row>
          <h2>Basket {basketIcon}</h2>
        </Row>
        {orderProduct
          .filter((t) => t.quantity !== 0 && t.confirmed == true)
          .map((p) => (
            <Row>
              product : {p.name} quantity : {p.quantity}{" "}
            </Row>
          ))}
      </Col>
    </>
  );
}

export { ClientOrder };
