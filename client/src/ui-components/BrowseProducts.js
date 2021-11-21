import { Row, Col, Container, Image } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import gAPI from "./../api/gAPI";
import "../css/custom.css";

function BrowserProducts(props) {
  const [products, setProducts] = useState([]);


  

  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await gAPI.getProducts();
      setProducts(productsTmp);
    };

    fillTables().catch((err) => setProducts([]));
  }, []);

  return (
    <>
      <Container className='justify-content-center cont '>
        <Row className='justify-content-center cont below'>
          <h2> Available Products</h2>
        </Row>

        <Row>
          <Col> </Col>
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
        <Container className='list'>
          {products
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((p) => (
              <Row className='below cont'>
                <Col>
                  {" "}
                  <Image
                    src={"./img/" + p.name + ".jpeg"}
                    className='ph-prev'
                  />{" "}
                </Col>
                <Col> {p.name}</Col>
                <Col> {p.quantity}</Col>
                <Col>{p.price} €/Kg</Col>
              </Row>
            ))}
        </Container>
      </Container>
    </>
  );
}

export { BrowserProducts };
