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

function NewOrder(props) {
  useEffect(() => {
    const fillTables = async () => {
      //const productsTmp = await API.getProducts();
      //const userTmp = await API.getUsers();
      //setProducts(productsTmp);
      //setUsers(usersTmp);
      //for (let p of productsTmp ){
      //  setOrderProducts(oldList => {return oldList.concat({idProduct : p.id,quantity : 0})})
      //}
    };

    fillTables();
  }, []);
  //return <> NewOrder </>;

  const handleSubmit = (event, props) => {
    console.log(orderProduct);
    //fare controllo che email sia presente nel db e invocare API che fa ordine
    let foundUser = false;
    //console.log(mail);
    for (let user of users) {
      if (user.email === mailInserted) foundUser = true;
    }
    if (foundUser === false) setErrorMessage("User not registered");
    else {
      //fare parseInt
      props.addMessage("Request sent correctly!");

      //API.insertOrder(orderProducts,mail)
      props.changeAction(0);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([
    { id: 1, quantity: 2, price: 20.5, name: "test1" },
    { id: 2, quantity: 3, price: 20.5, name: "test2" },
    { id: 3, quantity: 1, price: 20.5, name: "test3" },
  ]);

  const [orderProduct, setOrderProducts] = useState([]);
  const [users, setUsers] = useState([{ email: "user1" }, { email: "user2" }]);
  const [mailInserted, setMailInserted] = useState(undefined);
  const [selectedPs, setSelectPs] = useState([]);

  const selectProduct = (id) => {
    if (selectedPs.indexOf(id) == -1) {
      setOrderProducts((old) => [...old, { idProduct: id, quantity: 1 }]);
      setSelectPs((selectedPs) => [...selectedPs, id]);
    } else {
      setSelectPs((old) =>
        old.filter((p) => {
          return p != id;
        })
      );

      setOrderProducts((old) => old.filter((p) => p.idProduct !== id));
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
                              if (item.idProduct === p.id)
                                return {
                                  idProduct: p.id,
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
                          if (item.idProduct === p.id)
                            return { idProduct: p.id, quantity: i };
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
