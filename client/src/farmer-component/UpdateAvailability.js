import {
  Button,
  Form,
  Modal,
  Col,
  Row,
  Container,
  Spinner,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { BlockTitle, PageSection } from "../ui-components/Page";
import { ToastNotification } from "../ui-components/ToastNotification";

import API from "../API";

function UpdateAvailability(props) {
  useEffect(() => {
    const fillTables = async (id) => {
      //const productsTmp = await API.getProducts();
      //mettere questa chiamata API e togliere la precedwente
      const productsTmp = await API.getFarmerProducts(id);
      if (productsTmp) setIsProductsListLoading(false);
      setProducts(productsTmp);
    };

    fillTables(props.user.id);
  }, [props.user.id]);

  const handleSubmit = async (event, propsN) => {

    if (Object.keys(orderProduct).length === 0) {
      setErrorMessage("You have not updated any product.");
      return;
    }

    for (let productID in orderProduct) {
      let product = orderProduct[productID];

      if (product.quantity < 0 || product.price < 0) {
        setErrorMessage(
          "You have negative quantities and/or negative price for " +
          product.name +
          "."
        );
        continue;
      }

      let esito = await API.updateFarmerProducts(
        product.id,
        product.quantity,
        props.user.id,
        product.price
      );
      if (!esito) console.log("error");
    }
    propsN.addMessage("Request sent correctly!");

    propsN.changeAction(0);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [orderProduct, setOrderProducts] = useState({});

  const [selectedProduct, setSelectedProduct] = useState(false);
  const [isProductsListLoading, setIsProductsListLoading] = useState(true);

  const handleClose = () => {
    setOrderProducts({
      ...orderProduct,
      [selectedProduct.id]: {
        id: selectedProduct.id,
        name: selectedProduct.name,
        quantity: selectedProduct.quantity,
        price: selectedProduct.price,
      },
    });

    setSelectedProduct(false);
  };

  return (
    <PageSection>
      <ToastNotification
        variant='error'
        message={errorMessage}
        onSet={() => setErrorMessage("")}
      />

      <BlockTitle>Update Availability</BlockTitle>
      {
        <Modal
          show={!!selectedProduct}
          onHide={() => {
            setSelectedProduct(false);
          }}
          className='im-modal'>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Quantity:
            <Form.Control
              className='im-input'
              defaultValue={selectedProduct.quantity}
              type='number'
              onChange={(ev) => {
                if (!/^\d*$/.test(ev.target.value)) {
                  setErrorMessage("Quantity inserted is not valid!");
                  return;
                }

                let value = Number.parseFloat(ev.target.value);

                if (!isNaN(value) && value >= 0) {
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: value,
                  });
                }
              }}
              id={selectedProduct.id}
              size='sm'></Form.Control>
            Price:
            <Form.Control
              className='im-input'
              defaultValue={selectedProduct.price}
              type='number'
              onChange={(ev) => {
                if (!/^[0-9,.]*$/.test(ev.target.value)) {
                  setErrorMessage("Price inserted is not valid!");
                  return;
                }

                let value = Number.parseFloat(ev.target.value);

                if (!isNaN(value) && value > 0) {
                  setSelectedProduct({
                    ...selectedProduct,
                    price: value,
                  });
                }
              }}
              id={selectedProduct.id}
              size='sm'></Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className='im-button im-animate'
              variant='secondary'
              onClick={handleClose}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      }
      {isProductsListLoading ? (
        <Spinner animation='border' variant='success' size='sm'></Spinner>
      ) : (
        <Form>
          <Row>
            <Col>
              <strong>Name</strong>
            </Col>
            <Col>
              <strong>Quantity</strong>
            </Col>
            <Col>
              <strong>Price</strong>
            </Col>
            <Col>
              <strong>Action</strong>
            </Col>
          </Row>
          <Container
            responsive
            size='sm'
            className='below list over light-shadow-inset'>
            {products.map((p) => {
              let product = orderProduct[p.id] || p;
              return (
                <Row className='over below'>
                  <Col>{product.name} </Col>
                  <Col>{product.quantity} </Col>
                  <Col>{product.price} €</Col>
                  <Col>
                    <Button
                      className='im-button im-animate'
                      id='CheckBoxItem'
                      onClick={() => setSelectedProduct(product)}>
                      Edit
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Container>
          <Button
            className='below im-button im-animate'
            onClick={(ev) => handleSubmit(ev, props)}>
            Update
          </Button>
        </Form>
      )}
    </PageSection>
  );
}

export { UpdateAvailability };
