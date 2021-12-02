import { Row, Col, Container, Image, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import gAPI from "./../api/gAPI";
import "../css/custom.css";
import ErrorToast from "./ErrorToast";
import SearchForm from "./SearchForm";

function BrowserProducts(props) {
  const [products, setProducts] = useState([]);
  const [isProductsListLoading, setIsProductsListLoading] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = () => {};

  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await gAPI.getProducts();

      setIsProductsListLoading(false);
      setProducts(productsTmp);
      setServerErrorMessage(null);
    };

    fillTables().catch((err) => {
      setProducts([]);
      setServerErrorMessage("Server error: couldn't load products list.");
    });
  }, []);

  return (
    <>
      <Container className='justify-content-center '>
        <Row className='justify-content-center '>
          <h2> Available Products</h2>
        </Row>

        <ErrorToast
          errorMessage={serverErrorMessage}
          autohide
          show={serverErrorMessage !== null}
          className='justify-content-center'
          onClose={() => setServerErrorMessage(null)}></ErrorToast>

        <Container className='list'>
          {isProductsListLoading ? (
            <Container>
              <Spinner animation='border' variant='success'></Spinner>
            </Container>
          ) : (
            <>
              {" "}
              <Row>
                <SearchForm
                  setSearchValue={setSearchValue}
                  onSearchSubmit={handleSearchSubmit}
                />
              </Row>
              <Row>
                {products
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .filter(
                    (p) =>
                      p.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) && p.quantity > 0
                  )
                  .map((p) => (
                    <Col className='below over p-cont mr-3 '>
                      <Row className=' justify-content-center'>
                        {" "}
                        <Image
                          src={"./img/" + p.name + ".jpeg"}
                          className='ph-prev justify-content-center'
                        />{" "}
                      </Row>
                      <Row className='justify-content-center'> {p.name}</Row>
                      <Row className='justify-content-center'>
                        {" "}
                        {p.quantity}
                      </Row>
                      <Row className='justify-content-center'>
                        {p.price} €/Kg
                      </Row>
                      <Row className='justify-content-center'>{p.farmer} </Row>
                    </Col>
                  ))}
              </Row>
            </>
          )}
        </Container>
      </Container>
    </>
  );
}

export { BrowserProducts };
