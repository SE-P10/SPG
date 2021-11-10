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
          <h2> Available Products</h2>
        </Row>

        <Row>
          <Col>
            {" "}
            <h4> Name </h4>
          </Col>
          <Col>
            <h4> Quantity</h4>
          </Col>
          <Col>
            <h4> Price </h4>
          </Col>
        </Row>
        {products.map((p) => (
          <Row>
            <Col> {p.name}</Col>
            <Col> {p.quantity}</Col>
            <Col>{p.price}</Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export { BrowserProducts };
