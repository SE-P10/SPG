import { Container, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

import SearchForm from "./SearchForm";
import { ProductsList } from "./Products";
import { ToastNotification } from "./ToastNotification";
import API from "../API";
import { PageSection, BlockTitle } from "./Page";

function BrowserProducts(props) {

  const [products, setProducts] = useState([]);
  const [isProductsListLoading, setIsProductsListLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = () => {
    console.log("handle search submit")
  };

  useEffect(() => {
    const fillTables = async () => {
      const productsTmp = await API.getProducts();

      setIsProductsListLoading(false);
      setProducts(productsTmp);
      setErrorMessage(null);
    };

    fillTables().catch((err) => {
      setProducts([]);
      setErrorMessage("Server error: couldn't load products list.");
    });
  }, []);

  return (
    <PageSection>
      <ToastNotification
        message={errorMessage}
        onSet={() => setErrorMessage("")}
      />
      <BlockTitle center>Our Products</BlockTitle>
      <section className='im-list'>

        {isProductsListLoading ? (
          <Container>
            <Spinner animation='border' variant='success'></Spinner>
          </Container>
        ) : (
          <>
            <SearchForm
              setSearchValue={setSearchValue}
              onSearchSubmit={handleSearchSubmit}
            />
            <ProductsList
              products={products}
              setErrorMessage={setErrorMessage}
              filter={{ search: searchValue }}
            />
          </>
        )}
      </section>
    </PageSection>
  );
}

export { BrowserProducts };
