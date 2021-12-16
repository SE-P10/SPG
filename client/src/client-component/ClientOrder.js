import {
  Button,
  Alert,
  Form,
  Container,
  Spinner
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Basket } from "../client-component/Basket";
import API from "../API";
import { filterIcon } from "../ui-components/Icons";
import SearchForm from "../ui-components/SearchForm";
import { ProductsList } from "../ui-components/Products";
import {ToastNotification}from "../ui-components/ToastNotification";
import { PageSection, BlockTitle, PageSeparator } from "../ui-components/Page";

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
  const [changes, setChanges] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [walletValue, setWalletValue] = useState(null);
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const [isBasketLoading, setIsBasketLoading] = useState(true);

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
      if (modifyOrder !== -1) {
        let oldOrder = (await API.getOrder(modifyOrder)) || [];
        for (let p of oldOrder.products) {
          await API.insertProductInBasket({
            product_id: p.product_id,
            quantity: p.quantity,
          });
        }
      }

      let basketTmp = await API.getBasketProducts();

      if (basketTmp) {
        setIsBasketLoading(false);
        setOrderedProducts(basketTmp);
      }

      if (Number.parseInt(user.role) === 0) {
        const walletValueT = await API.getWalletByMail(user.email);
        setWalletValue(walletValueT);
        if (walletValueT) setIsWalletLoading(old => !old);
      }
      setChanges((old) => !old);
    };

    fillTables(props.user, props.modifyOrder);

  }, [props.user, props.modifyOrder]);

  const handleSubmit = async (event, propsN) => {

    event.preventDefault();
    let userId;
    let orderOk = true;

    if (Number.parseInt(props.user.role) === 1) {
      if (!mailInserted) {
        setErrorMessage("You have to insert an email!");
        orderOk = false;
      } else {
        let user = await API.getUserId(mailInserted);
        if (Number.parseInt(user.role) !== 0) {
          setErrorMessage("Invalid user");
          orderOk = false;
        } else {
          userId = user.id;
        }
      }
    } else userId = props.user.id;

    let basketTmp = await API.getBasketProducts();

    if (orderOk) {
      //metti a 0 elemtni vecchi eliminati

      let finalOrder = basketTmp.map((t) => ({
        product_id: t.id,
        confirmed: true,
        quantity: t.quantity,
        name: t.name,
      }));

      if (props.modifyOrder === -1) {
        let result = await API.insertOrder(userId, finalOrder);
        if (result) {
          API.deleteAllBasket();
          propsN.addMessage("Request sent correctly!");
          propsN.changeAction(0);
        } else {
          setErrorMessage("Server error during insert order. ");
        }
      } else {
        //fare chiamata ad update order
        API.updateOrderProducts(props.modifyOrder, finalOrder)
          .then(() => {
            propsN.addMessage("Request sent correctly!");
            API.deleteAllBasket();
            propsN.changeAction(0);
          })

          .catch((err) => {
            setErrorMessage("Server error during insert order. " + err);
          });
        propsN.changeAction(0);
      }
    }
  };

  const updateRequestedQuantity = async (product, quantity) => {

    let requestedProduct = products.filter(
      (t) => t.id === product.id
    );

    if (
      requestedProduct.length === 0 ||
      quantity > requestedProduct.quantity ||
      quantity <= 0
    )
      return false;

    else {
      await API.insertProductInBasket({ product_id: product.id, quantity: quantity });

      setChanges((old) => !old);

      return true;
    }
  }

  return (
    <section className="im-clientOrderWrapper">
      <PageSection style={{ flex: "1 1 800px" }}>
        <BlockTitle>
          Issue Order
        </BlockTitle>

        <ToastNotification
          variant='error'
          onSet={() => setErrorMessage("")}
          message={errorMessage}
        />

        {
          Number.parseInt(props.user.role) === 1 ? (
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Client mail</Form.Label>
              <Form.Control
                className="im-input"
                type='email'
                onChange={(ev) => {
                  setMailInserted(ev.target.value);
                }}
              />
            </Form.Group>
          ) : <></>}

        <PageSeparator />

        <section>
          <section>
            <SearchForm
              setSearchValue={setSearchValue}
              onSearchSubmit={() => { console.log("testSubmit") }}
            />
            {Number.parseInt(props.user.role) === 0 ? <div className='margin-yourwallet'>
              <h4 className='font-color'>Your Wallet</h4>
              {isWalletLoading ? (
                <Spinner
                  animation='border'
                  variant='success'
                  size='sm'></Spinner>
              ) : (
                <div className='margin-walletvalue'>{walletValue}€</div>
              )}
            </div> : <></>}
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
                  className="im-input"
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
                  className="im-input"
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
        ) :
          <>
            <h3 className='thirdColor below'> List of our products: </h3>
            <ProductsList
              products={products}
              setErrorMessage={setErrorMessage}
              updateRequestedQuantity={updateRequestedQuantity}
              filter={{ type: filterType, farmer: filterFarmer, search: searchValue }}
              orderedProducts={orderedProducts}
            />
          </>
        }
      </PageSection>

      <Basket
        style={{ flex: "1 1 0px" }}
        props={props}
        changes={changes}
        handleSubmit={handleSubmit}
        isBasketLoading={isBasketLoading}
      />
    </section>
  );
}

export { ClientOrder };
