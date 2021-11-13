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
import AFApi  from "../api/a-API";
import gAPI from "../gAPI";




function NewOrder(props) {




  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await gAPI.getProducts();
      //const userTmp = await API.getUsers();
      setProducts(productsTmp);
      
    };

    fillTables();
  }, []);
  //return <> NewOrder </>;

  const handleSubmit = async (event, props) => {
    
    let userId = await AFApi.getUserId(mailInserted);
    console.log(userId)
    if (userId.length === 0) setErrorMessage("User not registered");
    else {
      //fare parseInt
      props.addMessage("Request sent correctly!");

      AFApi.insertOrder(userId[0].id,orderProduct.filter(t => t.quantity !== 0))
      props.changeAction(0);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);

  const [orderProduct, setOrderProducts] = useState([]);
  const [mailInserted, setMailInserted] = useState(undefined);
  const [selectedPs, setSelectPs] = useState([]);

  const selectProduct = (id) => {
    if (selectedPs.indexOf(id) == -1) {
      setOrderProducts((old) => [...old, { product_id: id, quantity: 1 }]);
      setSelectPs((selectedPs) => [...selectedPs, id]);
    } else {
      setSelectPs((old) =>
        old.filter((p) => {
          return p != id;
        })
      );

      setOrderProducts((old) => old.filter((p) => p.product_id !== id));
    }
    console.log(orderProduct);
  };

  return (
    <>
      <Container className='justify-content-center cont'>
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
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Client mail</Form.Label>
            <Form.Control
              type='email'
              onChange={(ev) => {
                setMailInserted(ev.target.value);
              }}
            />
          </Form.Group>

          <h3 className='thirdColor'> List of our products: </h3>
          <Col className='below'>
            {products.map((p) => (
              <Row className='below'>
                <Col>{p.name} </Col>
                <Col>{p.price} €</Col>
                <Col>max quantity : {p.quantity}</Col>
                <Form.Group>
                  {" "}
                  <Form.Check
                    inline
                    onClick={() => selectProduct(p.id)}></Form.Check>{" "}
                  {selectedPs.indexOf(p.id) !== -1 ? (
                    <>
                      {" "}
                      Q:
                      <Form.Control
                        inline
                        defaultValue={1}
                        onChange={(ev) => {
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
                        }}
                        id={p.id}
                        type='number'
                        size='sm'
                        max={p.quantity}
                        min='0'></Form.Control>{" "}
                    </>
                  ) : null}
                </Form.Group>
                {/* <DropdownButton
                id='dropdown-basic-button'
                title='Select Quantity'>
                {[...Array(p.quantity + 1).keys()].map((i) => (
                  <Dropdown.Item
                    onClick={() => {
                      setOrderProducts((old) => {
                        const list = old.map((item) => {
                          if (item.product_id === p.id)
                            return { product_id: p.id, quantity: i };
                          else return item;
                        });
                        return list;
                      });
                    }}>
                    {i}
                  </Dropdown.Item>
                  ))}
                  </DropdownButton>*/}
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

export { NewOrder };
