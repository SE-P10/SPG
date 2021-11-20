import {
  Button,
  Alert,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Container,
  Image
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import "../css/custom.css";
import gAPI from "../api/gAPI";
import ordersApi from "../api/orders";

function NewOrder(props) {
  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await gAPI.getProducts();
      setProducts(productsTmp);
      const farmersTmp = productsTmp.map(t => t.farmer).filter(function(item,pos){
        return productsTmp.map(t => t.farmer).indexOf(item) == pos;

      });
      setFarmers(farmersTmp)
      const typesTmp = productsTmp.map(t => t.name).filter(function(item,pos){
        return productsTmp.map(t => t.name).indexOf(item) == pos;

      });
      setType(typesTmp) 
      
      
    };

    fillTables();
  }, []);

  const handleSubmit = async (event, propsN) => {
    let userId = await ordersApi.getUserId(mailInserted);
    if (userId.length === 0) setErrorMessage("Invalid user");
    else if (userId[0].role != 0) setErrorMessage("Invalid user");
    else {
      //fare parseInt
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
        ordersApi.insertOrder(
          userId[0].id,
          orderProduct.filter((t) => t.quantity !== 0)
        )
          .then(() => propsN.addMessage("Request sent correctly!"))
          .catch((err) => {
            setErrorMessage("Server error during insert order.");
          });
        propsN.changeAction(0);
      }
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);

  const [orderProduct, setOrderProducts] = useState([]);
  const [mailInserted, setMailInserted] = useState(undefined);
  const [selectedPs, setSelectPs] = useState([]);
  const [categorize,setCategorize] = useState(1) //0 per prodotti 1 per farmer
  const [filterCategorize,setFilterCategorize] = useState(undefined); //if farmer o tipo prodotto
  const [type,setType] = useState([])
  const [farmers,setFarmers] = useState([])
  const [viewFilter,setViewFilter] = useState(false)

  const selectProduct = (id) => {
    if (selectedPs.indexOf(id) == -1) {
      setOrderProducts((old) => [...old, { product_id: id, quantity: 1 }]);
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

        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Client mail</Form.Label>
            <Form.Control
              type='email'
              onChange={(ev) => {
                setMailInserted(ev.target.value);
              }}
            />
          </Form.Group>

        <Col><Button variant="primary" onClick={() => {setCategorize(0);setFilterCategorize(undefined);setViewFilter(true)}}> Show for type </Button>{" "}
        <Button variant="primary" onClick={() => {setCategorize(1);setFilterCategorize(undefined);setViewFilter(true)}}> Show for famer </Button></Col>


          { categorize === 0 && viewFilter === true?  
         <div>{type.map((t) => ( <Row>
          <Col>{t}</Col>
          <Col><Button variant="primary" onClick={() => {setFilterCategorize(t);setViewFilter(false);}}>select</Button></Col>
        </Row>))}
        </div>
          :
          <div>{ categorize == 1 && viewFilter === true?  <div>{farmers.map((t) => ( <Row>
            <Col>{t}</Col>
            <Col><Button variant="primary" onClick={() => {setFilterCategorize(t);setViewFilter(false);}}>select</Button></Col>
          </Row>))}
          </div> : ""}</div>


          }

        
        
        {filterCategorize != undefined ? <Form>
          

          <h3 className='thirdColor'> List of our products: </h3>
          <Col className='below list'>
            {products.filter(t => {return categorize === 0 ? t.name === filterCategorize : t.farmer === filterCategorize}).sort((a, b) => (a.name > b.name ? 1 : -1)).map((p) => (
              <Row className='below'>
                <Col>
                {" "}<Image src={"./img/" + p.name + ".jpeg"}
                className="ph-prev"/>
                 </Col>{" "}
                <Col>{p.name} </Col>
                <Col>{p.price} €</Col>
                <Col>max quantity : {p.quantity}</Col>
                <Col>Farmer : {p.farmer}</Col>
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
                
              </Row>
            ))}
          </Col>

          <Button
            className='se-button btn-block below'
            onClick={(ev) => handleSubmit(ev, props)}>
            Issue Order
          </Button>
        </Form> : ""}
      </Container>
    </>
  );
}

export { NewOrder };