import { Row, Col, Container, Image } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import gAPI from "./../gAPI";
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
      <Container className='justify-content-center '>
        <Row className='justify-content-center '>
          <h2> Available Products</h2>
        </Row>

        <Container className='list'>
          <Row>
            {products
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((p) => (
                <Col className='below p-cont mr-3 '>
                  <Row className='mx-auto'>
                    {" "}
                    <Image
                      src={"./img/" + p.name + ".jpeg"}
                      className='ph-prev'
                    />{" "}
                  </Row>
                  <Row className='justify-content-center'> {p.name}</Row>
                  <Row className='justify-content-center'> {p.quantity}</Row>
                  <Row className='justify-content-center'>{p.price} €/Kg</Row>
                </Col>
              ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export { BrowserProducts };
