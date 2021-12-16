import {
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import "../css/custom.css";

const ProductsList = (props) => {

  const setErrorMessage = props.setErrorMessage;
  const updateRequestedQuantity = props.updateRequestedQuantity;
  const orderedProducts = props.orderedProducts || [];

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

          let requestedQuantity = 0, requestedProduct = orderedProducts.filter((x) => { return x.id === p.id });

          if (requestedProduct[0]) {
            requestedQuantity = requestedProduct[0].quantity || 0;
          }

          return (<ProductCard
            product={p}
            setErrorMessage={setErrorMessage}
            updateRequestedQuantity={updateRequestedQuantity}
            requestedQuantity={requestedQuantity}
            justShow={justShow}
          />)
        }
        )}

    </div>
  )
}

const ProductCard = (props) => {

  const product = props.product;
  const setErrorMessage = props.setErrorMessage;

  const [requestedQuantity, setRequestedQuantity] = useState(props.requestedQuantity || 0);
  const [requestedQuantityTMP, setRequestedQuantityTMP] = useState(props.requestedQuantity || 0);

  const updateRequestedQuantity = props.updateRequestedQuantity;

  const justShow = props.justShow || false;

  useEffect(() => {

    setRequestedQuantity(props.requestedQuantity);
    setRequestedQuantityTMP(props.requestedQuantity)

  }, [props.requestedQuantity]);

  if (!product) {
    return (<></>)
  }

  return (
    <Card className="im-productcard im-animate">
      <Card.Img variant="top" className="im-productcard__image" src={"./img/" + product.name + ".jpeg"} loading="lazy" />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between'><span>{product.name}</span><span>{product.quantity}</span></Card.Title>
        <Card.Text>
          <Row className='justify-content-center'>
            {product.price} €/Kg
          </Row>
          {
            justShow ? <></>
              :
              <Row className='justify-content-center '>
                <input type="number"
                  onChange={(ev) => {
                    if (isNaN(parseInt(ev.target.value))) { setErrorMessage("not a number"); }
                    else {
                      setRequestedQuantityTMP(parseInt(ev.target.value));
                    }
                  }}
                  id={product.id}
                  value={requestedQuantityTMP}
                  min={0}
                />
              </Row>
          }
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex">
        {
          justShow ? <small>{product.farmer}</small>
            :
            <Button
              className='im-button im-animate mx-auto'
              onClick={(ev) => {

                setRequestedQuantity(requestedQuantityTMP);

                if (!updateRequestedQuantity(product, requestedQuantityTMP)) {
                  setErrorMessage("Wrong quantity");
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