import { Row, Col, Container, Image, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import gAPI from "./../api/gAPI";
import "../css/custom.css";

function BrowserProducts(props) {
  const [products, setProducts] = useState([]);
  const [isProductsListLoading, setIsProductsListLoading] = useState(true);

  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await gAPI.getProducts();
      setIsProductsListLoading(false);
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
          {isProductsListLoading ? (
            <Container>
              <Spinner animation='border' variant='success'></Spinner>
            </Container>
          ) : (
            <Row>
              {products
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((p) => (
                  <Col className='below p-cont mr-3 '>
                    <Row className=' justify-content-center'>
                      {" "}
                      <Image
                        src={"./img/" + p.name + ".jpeg"}
                        className='ph-prev justify-content-center'
                      />{" "}
                    </Row>
                    <Row className='justify-content-center'> {p.name}</Row>
                    <Row className='justify-content-center'> {p.quantity}</Row>
                    <Row className='justify-content-center'>{p.price} €/Kg</Row>
                    <Row className='justify-content-center'>{p.farmer} </Row>
                  </Col>
                ))}
            </Row>
          )}
        </Container>
      </Container>
    </>
  );
}

export { BrowserProducts };
