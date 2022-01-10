import { Button, Form, Container, Spinner, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Basket } from "../client-component/Basket";
import API from "../API";
import { filterIcon } from "../ui-components/Icons";
import SearchForm from "../ui-components/SearchForm";
import { ProductsList } from "../ui-components/Products";
import { ToastNotification } from "../ui-components/ToastNotification";
import {
  PageSection,
  BlockTitle,
  PageSeparator,
  PageTitle,
} from "../ui-components/Page";

function ClientOrder(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [type, setType] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [viewFilter, setViewFilter] = useState(false);
  const [categorize, setCategorize] = useState(1); //0 per prodotti 1 per farmer
  const [filterType, setFilterType] = useState("Type"); //Type -> all types
  const [filterFarmer, setFilterFarmer] = useState("Farmer"); // Farmer -> all farmers
  const [mailInserted, setMailInserted] = useState(undefined);
  const [isProductListLoading, setIsProductListLoading] = useState(true);
  const [updateBasket, setUpdateBasket] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [walletValue, setWalletValue] = useState(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);

  useEffect(() => {
    const fillTables = async (user, modifyOrder) => {
      const productsTmp = await API.getProducts();
      setProducts(productsTmp);
      const farmersTmp = productsTmp
        .map((t) => t.farmer)
        .filter(function (item, pos) {
          return productsTmp.map((t) => t.farmer).indexOf(item) === pos;
        });

      setFarmers(farmersTmp);
      setIsProductListLoading(false);

      const typesTmp = productsTmp
        .map((t) => t.name)
        .filter(function (item, pos) {
          return productsTmp.map((t) => t.name).indexOf(item) === pos;
        });

      setType(typesTmp);
      //Chiamare API che prende backet
      //{product_id : p.id , confirmed : true, quantity : item.quantity, name : p.name}

      if (modifyOrder > 0) {
        let oldOrder = await API.getOrder(modifyOrder);

        for (let p of oldOrder.products) {
          await API.insertProductInBasket({
            product_id: p.product_id,
            quantity: p.quantity,
          });
        }
        setUpdateBasket((old) => !old);
      }

      setOrderedProducts(await API.getBasketProducts());

      if (Number.parseInt(user.role) === 0) {
        const walletValueT = await API.getWalletByMail(user.email);
        setWalletValue(walletValueT);
        if (walletValueT) setIsWalletLoading((old) => !old);
      }
    };

    fillTables(props.user, props.modifyOrder);
  }, [props.user, props.modifyOrder]);

  const handleBasketSubmit = async (basket) => {

    let userId = props.user.id || 0, user = {};

    const updatingOrder = props.modifyOrder > 0;

    if (Number.parseInt(props.user.role) === 1) {

      if (!mailInserted) {
        setErrorMessage("You have to insert an email!");
        return;
      }

      try {
        user = await API.getUserId(mailInserted);
      } catch (e) {
        setErrorMessage("User not found");
        return;
      }

      if (Number.parseInt(user.role) !== 0) {
        setErrorMessage("Invalid user");
        return;
      }

      userId = user.id;
    }

    if (!basket || basket.length === 0) {
      setErrorMessage("No products found in the basket!");
      return;
    }

    let finalOrder = basket.map((t) => ({
      product_id: t.id,
      quantity: t.quantity,
    }));

    if (!updatingOrder) {

      let result = await API.insertOrder(userId, finalOrder);

      if (!result) {
        setErrorMessage("Server error during insert order.");
        return;
      }

      API.deleteAllBasket();
      props.addMessage("Request sent correctly!");
      props.changeAction(0);
    } else {
      //fare chiamata ad update order
      API.updateOrderProducts(props.modifyOrder, finalOrder)
        .then(() => {
          props.addMessage("Request sent correctly!");
          API.deleteAllBasket();
          props.changeAction(0);
        })
        .catch((err) => {
          setErrorMessage("Server error during insert order. " + err);
        });

      props.changeAction(0);
    }
  };

  const handleBasketChange = async (basket) => {
    setOrderedProducts(basket);
  };

  const updateRequestedQuantity = async (product, quantity) => {

    let requestedProduct = products.filter((t) => {
      return t.id === product.id;
    })[0];

    if (!requestedProduct || quantity > requestedProduct.quantity || quantity <= 0) {
      return false;
    }

    await API.insertProductInBasket({
      product_id: product.id,
      quantity: quantity,
    });

    setOrderedProducts(await API.getBasketProducts());

    setUpdateBasket((old) => !old);

    return true;
  };

  return (
    <section className='im-clientOrderWrapper'>
      <PageSection style={{ flex: "1 1 800px" }}>
        <PageTitle className='over-2'>Issue Order</PageTitle>

        <ToastNotification
          variant='error'
          onSet={() => setErrorMessage("")}
          message={errorMessage}
        />

        {Number.parseInt(props.user.role) === 1 ? (
          <Form.Group className='mb-3'>
            <Form.Label>Client mail</Form.Label>
            <Form.Control
              className='im-input'
              type='email'
              onChange={(ev) => {
                setMailInserted(ev.target.value);
              }}
            />
          </Form.Group>
        ) : (
          <></>
        )}

        <PageSeparator />

        <section>
          <section>
            <SearchForm
              setSearchValue={setSearchValue}
            />
            {Number.parseInt(props.user.role) === 0 ? (
              <Row className='d-flex justify-content-end'>
                <div className='im-yourwallet'>
                  <h4 className='font-color'>Your Wallet</h4>
                  {isWalletLoading ? (
                    <Spinner
                      animation='border'
                      variant='success'
                      size='sm'></Spinner>
                  ) : (
                    <div>{walletValue}€</div>
                  )}
                </div>
              </Row>
            ) : (
              <></>
            )}
          </section>
          <Button
            className='below im-button im-animate'
            onClick={() => {
              if (showFilterMenu) {
                setShowFilterMenu(false);
                setCategorize(2);
                setFilterType("Type");
                setFilterFarmer("Farmer");
                setViewFilter(false);
              } else setShowFilterMenu(true);
            }}>
            {filterIcon} {showFilterMenu ? <> x </> : <>Filters</>}
          </Button>
          {showFilterMenu ? (
            <>
              <Form className='below'>
                <Form.Control
                  className='im-input'
                  as='select'
                  onChange={(event) => {
                    setCategorize(0);
                    setViewFilter(true);
                    setFilterType(event.target.value);
                    setViewFilter(false);
                  }}>
                  <option value={undefined}> Type</option>
                  {type
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((t) => (
                      <option value={t}>{t}</option>
                    ))}
                </Form.Control>
              </Form>
              <Form>
                <Form.Control
                  className='im-input'
                  as='select'
                  onChange={(event) => {
                    setCategorize(1);

                    setFilterFarmer(event.target.value);
                    setViewFilter(false);
                  }}>
                  <option value={undefined}> Farmer</option>
                  {farmers.map((t) => (
                    <option value={t}>{t}</option>
                  ))}
                </Form.Control>
              </Form>
            </>
          ) : null}
        </section>

        {categorize === 0 && viewFilter === true ? (
          <Form>
            <Form.Control
              as='select'
              onChange={(event) => {
                setCategorize(0);
                setViewFilter(true);
                setFilterType(event.target.value);
                setViewFilter(false);
              }}>
              <option value='Type'> Type</option>
              {type
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((t) => (
                  <option value={t}>{t}</option>
                ))}
            </Form.Control>
          </Form>
        ) : (
          <>
            {categorize === 1 && viewFilter === true ? (
              <div>
                <Form>
                  <Form.Control
                    as='select'
                    onChange={(event) => {
                      setFilterFarmer(event.target.value);
                      setViewFilter(false);
                    }}>
                    <option value=''> Farmer</option>
                    {farmers.map((t) => (
                      <option value={t}>{t}</option>
                    ))}
                  </Form.Control>
                </Form>
              </div>
            ) : (
              ""
            )}
          </>
        )}
        {isProductListLoading ? (
          <Container className='below'>
            <Spinner animation='border' variant='success'></Spinner>
          </Container>
        ) : (
          <>
            <BlockTitle className='thirdColor below-2 over-2'>

              List of our products:
            </BlockTitle>
            <ProductsList
              products={products}
              setErrorMessage={setErrorMessage}
              updateRequestedQuantity={updateRequestedQuantity}
              filter={{
                type: filterType,
                farmer: filterFarmer,
                search: searchValue,
              }}
              orderedProducts={orderedProducts}
            />
          </>
        )}
      </PageSection>

      <Basket
        style={{ flex: "1 1 0px" }}
        changes={updateBasket}
        handleSubmit={handleBasketSubmit}
        handleChange={handleBasketChange}
      />
    </section>
  );
}

export { ClientOrder };
