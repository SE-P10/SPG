import {
  Button,
  Row,
  Card,
  Col,
  InputGroup,
  FormControl
} from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useState, useEffect } from "react";

const ProductsList = (props) => {

  const setErrorMessage = props.setErrorMessage;
  const updateRequestedQuantity = props.updateRequestedQuantity;
  const orderedProducts = props.orderedProducts;

  let justShow = props.justShow || !updateRequestedQuantity;

  const filterCallback = (t, filter) => {

    let res = filter.search ? t.name.toLowerCase().includes(filter.search.toLowerCase()) : true;

    if (filter.type && filter.farmer) {
      if (res && filter.type !== "Type" && filter.farmer === "Farmer")
        return t.name === filter.type && t.quantity > 0;

      if (res && filter.type === "Type" && filter.farmer !== "Farmer")
        return t.farmer === filter.farmer && t.quantity > 0;

      if (res && filter.type !== "Type" && filter.farmer !== "Farmer")
        return t.farmer === filter.farmer && t.name === filter.type;
    }

    return res;
  };

  const [products, setProducts] = useState([])

  useEffect(() => {

    setProducts(props.products.sort((a, b) => a.name > b.name).filter((t) => filterCallback(t, props.filter || {})))

  }, [props.products, props.filter])

  return (
    <div className='im-grid'>
      {
        products.map((p) => {

          let requestedQuantity = 0;

          if (!justShow) {

            let requestedProduct = orderedProducts.filter((x) => { return x.id === p.id });

            if (requestedProduct[0]) {
              requestedQuantity = requestedProduct[0].quantity || 0;
            }
          }

          return (
            <ProductCard
              key={p.id}
              product={p}
              setErrorMessage={setErrorMessage}
              updateRequestedQuantity={updateRequestedQuantity}
              requestedQuantity={requestedQuantity}
              justShow={justShow}
            />
          )
        }
        )}

    </div>
  )
}

const ProductCard = (props) => {

  const product = props.product;
  const setErrorMessage = props.setErrorMessage;

  const [requestedQuantity, setRequestedQuantity] = useState(props.requestedQuantity);
  const [requestedQuantityTMP, setRequestedQuantityTMP] = useState(props.requestedQuantity);
  const [availableQuantity, setAvailableQuantity] = useState(product.quantity);

  const updateRequestedQuantity = props.updateRequestedQuantity;

  const justShow = props.justShow || false;

  useEffect(() => {

    if (props.requestedQuantity == 0) {
      setAvailableQuantity(product.quantity + requestedQuantity);
    }

    setRequestedQuantity(props.requestedQuantity);
    setRequestedQuantityTMP(props.requestedQuantity);

  }, [props.requestedQuantity]);

  if (!product || !product.id) {
    return (<></>)
  }

  const UpdateProductOrder = (value) => {

    if (value < 0 || availableQuantity + value < 0) {
      setErrorMessage("Quantity inserted is not valid!");
      return;
    }

    if (value > availableQuantity) {
      setErrorMessage("Quantity inserted is too much!");
      return;
    }

    setRequestedQuantityTMP(requestedQuantityTMP + value);

    setAvailableQuantity(old => old - value);
  }

  const availablePercent = availableQuantity <= 0 ? 0 : availableQuantity / product.estimated_quantity * 100;

  return (
    <Card className="im-productcard im-animate">
      <Card.Img variant="top" className="im-productcard__image" src={"./img/" + product.name + ".jpeg"} loading="lazy" />
      <Card.Body>

        <Card.Title>
          <Row className='d-flex justify-content-between mb-1'>
            <Col><strong>{product.name}</strong></Col>
            <Col className="im-product-price"><strong>{product.price}</strong>€/<small>Kg</small></Col>
          </Row>
        </Card.Title>

        <Card.Text>
          {
            justShow ? <></>
              :
              <>
                <Row className='justify-content-center'>
                  <small>{product.farmer}</small>
                </Row>
                <InputGroup className="below d-flex justify-content-center text-center">

                  <Button
                    disabled={product.quantity === 0}
                    variant="outline-secondary"
                    onClick={() => UpdateProductOrder(-1)}
                  >
                    -
                  </Button>
                  <FormControl
                    className="im-input im-input--silent text-center"
                    style={{ maxWidth: "55px", maxHeight: "38px" }}
                    id={product.id}
                    onChange={(ev) => {

                      const value = ev.target.value;

                      if (value === '') {
                        setRequestedQuantityTMP('');
                        setAvailableQuantity(product.quantity + requestedQuantity);
                        return;
                      }

                      if (!(/^[0-9,.]*$/.test(value))) {
                        setErrorMessage("Quantity inserted is not number!");
                        return;
                      }

                      if ((/[,.]{1}$/.test(value)) && !(/[,.]{1}$/.test(Number.parseFloat(value).toString()))) {
                        setRequestedQuantityTMP(value);
                        return;
                      }

                      const parsed = Number.parseFloat(value);

                      if (!isNaN(parsed)) {
                        setAvailableQuantity(product.quantity + requestedQuantity - parsed);
                        setRequestedQuantityTMP(parsed);
                      }
                      else {
                        setErrorMessage("Quantity inserted is not valid!");
                      }
                    }}
                    disabled={product.quantity === 0}
                    value={requestedQuantityTMP}
                    min={0}
                    autoComplete="off"
                  />
                  <Button
                    disabled={product.quantity === 0}
                    variant="outline-secondary"
                    onClick={() => UpdateProductOrder(1)}
                  >
                    +
                  </Button>
                </InputGroup >
              </>
          }

          <div className="text-center below">
            <ProgressBar className="im-progressbar" now={availablePercent} visuallyHidden />
            <small className="text-end"><strong>{availableQuantity > 0 ? availableQuantity : 0} left</strong> of {product.estimated_quantity} available</small>
          </div>

        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex">
        {
          justShow ? <small>{product.farmer}</small>
            :
            <Button
              className='im-button im-animate mx-auto'
              onClick={async (ev) => {

                let oldRequestedQuantityTMP = requestedQuantity;

                setRequestedQuantity(requestedQuantityTMP);

                let updateRes = await updateRequestedQuantity(product, requestedQuantityTMP);

                if (!updateRes) {
                  setErrorMessage("Quantity inserted is not valid!");
                  setRequestedQuantity(oldRequestedQuantityTMP);
                }

              }}>
              {requestedQuantity > 0 ? "MODIFY" : "ADD"}
            </Button>
        }
      </Card.Footer>
    </Card>

  )
}



export { ProductCard, ProductsList };