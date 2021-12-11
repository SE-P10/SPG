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
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import "../css/custom.css";
import {Basket} from "../client-component/Basket"
import API from "../API";
import { filterIcon } from "../ui-components/Icons";
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
  const [mailInserted, setMailInserted] = useState(undefined);
  const [isProductListLoading, setIsProductListLoading] = useState(true);
  const [changes,setChanges] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const setIsOrderProductDirtyOk = () => {
    setIsOrderProductDirty(true);
  };

  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await API.getProducts();
      setProducts(productsTmp);
      setIsProductListLoading(false);
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
      let basketTmp = [];
      if (props.modifyOrder == -1)
      basketTmp = await API.getBasketProducts(setIsOrderProductDirtyOk);
      else {
              
              let oldOrder = await API.getOrder(props.modifyOrder);
              for (let p of oldOrder.products){
                API.insertProductInBasket({
                  product_id: p.product_id,
                  quantity: p.quantity,
                })
              }
        }


      setOrderProduct(
        basketTmp.map((t) => ({
          product_id: t.product_id,
          confirmed: true,
          quantity: t.quantity,
          name: t.name,
        }))
      );
      setChanges(old => !old);
      console.log(orderProduct)
    };

    fillTables();
  }, [isOrderProductDirty]);

  const handleSubmit = async (event, propsN) => {
    event.preventDefault();
    let userId;
    let orderOk = true;

    if (props.user.role == 1) {
      if (!mailInserted) {
        setErrorMessage("You have to insert an email!");
        orderOk = false;
      } else {
        userId = await API.getUserId(mailInserted);
        if (userId.length === 0 || userId[0].role != 0) {
          setErrorMessage("Invalid user");
          orderOk = false;
        } 
        if (orderOk) userId = userId[0].id;
      }
    } else userId = props.user.id;
    const basketTmp = await API.getBasketProducts(setIsOrderProductDirtyOk);

    if (orderOk && basketTmp.length === 0) {
      setErrorMessage("Can't issue an order without items.");
      orderOk = false;
    }

    if (orderOk) {
      API.deleteAllBasket();
      
      let finalOrder = basketTmp.map((t) => ({
        product_id: t.id,
        confirmed: true,
        quantity: t.quantity,
        name: t.name,
      }))
      if (props.modifyOrder == -1){
      API.insertOrder(
        userId,
        finalOrder
      ).then(() => {
          propsN.addMessage("Request sent correctly!");
        
          propsN.changeAction(0);
        })
        .catch((err) => {
          setErrorMessage("Server error during insert order. "+err);
        });}
        else { //fare chiamata ad update order
          API.updateOrderProducts(props.modifyOrder,finalOrder).then(() => {
            propsN.addMessage("Request sent correctly!");
          
            propsN.changeAction(0);
          })
          
          .catch((err) => {
            setErrorMessage("Server error during insert order. "+err);
          });
          propsN.changeAction(0)
        }
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

        {props.user.role == 1 ? (
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Client mail</Form.Label>
            <Form.Control
              type='email'
              onChange={(ev) => {
                setMailInserted(ev.target.value);
              }}
            />
          </Form.Group>
        ) : null}

        <Col sm={8}>
          <Row>
            <SearchForm
              setSearchValue={setSearchValue}
              onSearchSubmit={() => {console.log("test")}}
            />
          </Row>
          <Button
            className='spg-button below'
            onClick={() => {
              if (showFilterMenu) {
                setShowFilterMenu(false);
                setCategorize(2);
                setFilterType("Type");
                setFilterFarmer("Farmer");
                setViewFilter(false);
              } else setShowFilterMenu(true);
            }}>
            {" "}
            {filterIcon} {showFilterMenu ? <> x </> : <>Filters</>}
          </Button>{" "}
          {showFilterMenu ? (
            <>
              {" "}
              <Form className='below'>
                <Form.Control
                  as='select'
                  onChange={(event) => {
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
        {isProductListLoading ? (
          <Container className='below'>
            <Spinner animation='border' variant='success'></Spinner>
          </Container>
        ) : (
          <Form>
            <h3 className='thirdColor below'> List of our products: </h3>
            <Col className='below list'>
              {products
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .filter((t) => {
                  if (filterType === "Type" && filterFarmer === "Farmer")
                    return (
                      true &&
                      t.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) &&
                      t.quantity > 0
                    );

                  if (filterType !== "Type" && filterFarmer === "Farmer")
                    return (
                      t.name == filterType &&
                      t.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) &&
                      t.quantity > 0
                    );

                  if (filterType == "Type" && filterFarmer !== "Farmer")
                    return (
                      t.farmer == filterFarmer &&
                      t.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) &&
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
                            
                            API.insertProductInBasket(
                              orderProduct
                                .filter((t) => t.product_id === p.id)
                                .map((t) => ({
                                  product_id: t.product_id,
                                  quantity: t.quantity,
                                }))[0]
                            );
                            
                            setChanges(old => !old);
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
                        {orderProduct.filter(
                      (t) => t.product_id === p.id && t.confirmed == true
                    ).length === 0 ? "ADD" : "MODIFY" }
                       </Button>
                    
                    <Col>
                      
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
                      
                    </Col>
                  </Row>
                ))}
            </Col>
          </Form>
        )}
      </Col>
      <Col sm={4} className='ml-3'>
        <Basket props={props} changes={changes} setIsOrderProductDirtyOk={setIsOrderProductDirtyOk} handleSubmit={handleSubmit} setIsOrderProductDirty={setIsOrderProductDirty} setOrderProduct={setIsOrderProductDirtyOk} />
      </Col>
    </>
  );
}

export { ClientOrder };