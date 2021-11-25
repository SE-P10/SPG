import {
  Button,
  Alert,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Container,
  Image,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import "../css/custom.css";
import gAPI from "../api/gAPI";
import API from "../API";
import { filterIcon, basketIcon, deleteIcon } from "../ui-components/Icons";
import SearchForm from "../ui-components/SearchForm";

function ClientOrder(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [orderProduct, setOrderProduct] = useState([]);
  const [type, setType] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [viewFilter, setViewFilter] = useState(false);
  const [categorize, setCategorize] = useState(1); //0 per prodotti 1 per farmer
  const [filterType, setFilterType] = useState("Type"); //Type -> all types
  const [filterFarmer, setFilterFarmer] = useState("Farmer"); // Farmer -> all farmers
  const [isOrderProductDirty, setIsOrderProductDirty] = useState(true);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
          <Row>
            <SearchForm
              setSearchValue={setSearchValue}
              onSearchSubmit={() => {}}
            />
          </Row>
          <Button
            className='spg-button'
            onClick={() => {
              if (showFilterMenu) {
                setShowFilterMenu(false);
                setCategorize(0);
                setViewFilter(false);
              } else setShowFilterMenu(true);
            }}>
            {" "}
            {filterIcon} {showFilterMenu ? <> x </> : <>Filters</>}
          </Button>{" "}
          {showFilterMenu ? (
            <>
              {" "}
              <Button
                className='spg-button'
                onClick={() => {
                  setCategorize(2);
                  setFilterType("Type");
                  setFilterFarmer("Farmer");

                  setViewFilter(true);
                }}>
                {" "}
                Show all{" "}
              </Button>{" "}
              <Form className='below'>
                <Form.Control
                  as='select'
                  onChange={(event) => {
                    console.log(event.target.value);
                    setCategorize(0);
                    setViewFilter(true);
                    setFilterType(event.target.value);
                    setViewFilter(false);
                  }}>
                  <option value={undefined}> Type</option>
                  {type
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((t) => (
                      <option value={t}>{t}</option>
                    ))}
                </Form.Control>
              </Form>
              <Form>
                <Form.Control
                  as='select'
                  onChange={(event) => {
                    setCategorize(1);

                    console.log(event.target.value);
                    setFilterFarmer(event.target.value);
                    setViewFilter(false);
                  }}>
                  <option value={undefined}> Farmer</option>
                  {farmers.map((t) => (
                    <option value={t}>{t}</option>
                  ))}
                </Form.Control>
              </Form>
            </>
          ) : null}
        </Col>

        {categorize === 0 && viewFilter === true ? (
          <div>
            <Form>
              <Form.Control
                as='select'
                onChange={(event) => {
                  console.log(event.target.value);
                  setCategorize(0);
                  setViewFilter(true);
                  setFilterType(event.target.value);
                  setViewFilter(false);
                }}>
                <option value='Type'> Type</option>
                {type
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((t) => (
                    <option value={t}>{t}</option>
                  ))}
              </Form.Control>
            </Form>
          </div>
        ) : (
          <div>
            {categorize == 1 && viewFilter === true ? (
              <div>
                <Form>
                  <Form.Control
                    as='select'
                    onChange={(event) => {
                      console.log(event.target.value);
                      setFilterFarmer(event.target.value);
                      setViewFilter(false);
                    }}>
                    <option value=''> Farmer</option>
                    {farmers.map((t) => (
                      <option value={t}>{t}</option>
                    ))}
                  </Form.Control>
                </Form>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <Form>
          <h3 className='thirdColor below'> List of our products: </h3>
          <Col className='below list'>
            {products
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .filter((t) => {
                if (filterType === "Type" && filterFarmer === "Farmer")
                  return (
                    true &&
                    t.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                    t.quantity > 0
                  );

                if (filterType !== "Type" && filterFarmer === "Farmer")
                  return (
                    t.name == filterType &&
                    t.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                    t.quantity > 0
                  );

                if (filterType == "Type" && filterFarmer !== "Farmer")
                  return (
                    t.farmer == filterFarmer &&
                    t.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                    t.quantity > 0
                  );

                if (filterType !== "Type" && filterFarmer !== "Farmer")
                  return (
                    t.farmer == filterFarmer &&
                    t.name == filterType &&
                    t.name.toLowerCase().includes(searchValue.toLowerCase())
                  );
              })
              .map((p) => (
                <Row className='below'>
                  <Image
                    src={"./img/" + p.name + ".jpeg"}
                    className='ph-prev justify-content-center'
                  />{" "}
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
        </Form>
      </Col>
      <Col sm={4} className='ml-3'>
        <Row>
          <h2>Basket {basketIcon}</h2>
        </Row>

        {orderProduct.length !== 0 ? (
          <>
            {orderProduct
              .filter((t) => t.quantity !== 0 && t.confirmed == true)
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
                          setIsOrderProductDirty(true);
                          setOrderProduct((old) => {
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
          <> You basket is empty!</>
        )}
        <Row>
          <Button
            className='spg-button  mx-auto below'
            onClick={(ev) => handleSubmit(ev, props)}>
            Issue Order
          </Button>
        </Row>
      </Col>
    </>
  );
}

export { ClientOrder };
