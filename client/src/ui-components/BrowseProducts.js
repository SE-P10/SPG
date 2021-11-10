import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";


function BrowserProducts(props) {
  const [products, setProducts] = useState([
    { id: 1, quantity: 2, price: 20.5, name: "test" },
    { id: 2, quantity: 2, price: 20.5, name: "test" },
    { id: 3, quantity: 2, price: 20.5, name: "test" },
  ]);
  
  
  useEffect(() => {
    const fillTables = async () => {
      //const productsTmp = await API.getProducts();
      //setProducts(productsTmp);
    };

    fillTables();
  }, []);
  //return <> NewOrder </>;

  return (
    <> 
   <Container className='justify-content-center'>
    <Row className='justify-content-center'>
          <h2>Products</h2>
      </Row>
      <Col>
      {products.map((p) => (
        <Row>
          <Col> name : {p.name}
          </Col>
          <Col> quantity : {p.quantity}
          </Col><Col>price :  {p.price}
          </Col>
        </Row>
      ))}
      </Col>
      </Container>
      </>
  );
}

export { BrowserProducts };
