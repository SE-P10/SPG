import {
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";

import { useEffect } from "react";
import API from "./../API";
import "../css/custom.css";

function YourOrders(props) {
  const [orders, setOrders] = useState([]);
  const [isOrderListDirty, setIsOrderListDirty] = useState(true);
  const [isOrderListLoading, setIsProductListLoading] = useState(true);
  const [openDeliveryForm, setOpenDeliveryForm] = useState(false);
  const [openPickupForm, setOpenPickupForm] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [errorMessage,setErrorMessage] = useState("")
  const [selectedOrderId,setSelectedOrderId] = useState(null)

  const onDateTimeChange = (newDate) => {
    setDateTime(() => newDate);
  };

  const handleShippingInfo = () =>{
    setErrorMessage("")
    if(openPickupForm && dateTime){
      API.deliveryOrder(selectedOrderId,dateTime)
      handleClose()
    }
    else if(openDeliveryForm && dateTime && address){
      API.deliveryOrder(selectedOrderId,dateTime,address)
      handleClose()
    }
    else{
      setErrorMessage("Insert a valid date and/or address")
    }
    setOpenDeliveryForm(false)
    setOpenPickupForm(false)
  }

  useEffect(() => {
    const fillOrders = async () => {
      let ordersTmp = await API.getOrders(props.user.email);
      setIsProductListLoading(false);
      if (ordersTmp.length === 0) {
      } else {
        setOrders(ordersTmp);
        setIsOrderListDirty(false);
      }
    };
    fillOrders();
  }, [isOrderListDirty]);

  return (
    <>
      <Col className="cont">
        <Row className="justify-content-center">
          {isOrderListLoading ? (
            <Container className="below">
              <Spinner animation="border" variant="success"></Spinner>
            </Container>
          ) : (
            <>
              {orders.length !== 0 ? (
                <>
                  <Col>
                    <Row>
                      {" "}
                      <h3 className="thirdColor mx-auto">
                        {" "}
                        List of your orders{" "}
                      </h3>{" "}
                    </Row>
                    {orders.map((order) => (
                      <Row className="over">
                        <Col> id : {order.id}</Col>
                        <Col>price : {order.price}</Col>
                        <Col>status : {order.status}</Col>
                        {order.status == 'booked' ? <Col><Button className='spg-button' onClick={() => props.modifyOrder(order.id)} >Modify </Button> </Col>: <Col></Col>}
                        {order.status === "confirmed" ? 
                        <>
                        <Col>
                          <Button className="spg-button" onClick={() => {setShow(true)
                          setSelectedOrderId(order.id)}}>
                          Shipping Info
                          </Button>
                        </Col>
                        </>
                        : <Col></Col>}
                      </Row>
                    ))}{" "}
                  </Col>
                </>
              ) : (
                <>
                  <h3 className="below">
                    {" "}
                    No orders found! Purchaise a &ensp;
                    <Button
                      className="spg-button"
                      onClick={() => props.changeAction(2)}
                    >
                      {" "}
                      New Order{" "}
                    </Button>
                  </h3>
                </>
              )}{" "}
            </>
          )}
        </Row>
      </Col>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className="font-color">Home Delivery or Pick-Up?</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorMessage ? (
          <Alert
            variant='danger'
            onClose={() => setErrorMessage("")}
            dismissible>
            {" "}
            {errorMessage}{" "}
          </Alert>
        ) : (
          ""
        )}
          <Form>
            <Form.Group>
              <Row>
                <Form.Check
                  label="Pick-Up"
                  type="radio"
                  name="group1"
                  id="pickup"
                  onClick={() => {
                    setOpenPickupForm(true);
                    setOpenDeliveryForm(false);
                  }}
                ></Form.Check>
              </Row>
              <Row>
                <Form.Check
                  label="Home Delivery"
                  name="group1"
                  type="radio"
                  id="homedelivery"
                  onClick={() => {
                    setOpenDeliveryForm(true);
                    setOpenPickupForm(false);
                  }}
                ></Form.Check>
              </Row>
            </Form.Group>

            {openPickupForm ? (
              <>
                <Row className="justify-content-center font-color">
                  Choose A Date
                </Row>
                <DatePicker
                  className="form-control fw-300"
                  selected={dateTime}
                  onChange={onDateTimeChange}
                  showTimeSelect
                  isClearable
                  dateFormat="dd/MM/yyyy, hh:mm a"
                  placeholderText="No date&time set"
                  minDate={new Date()}
                />
              </>
            ) : null}

            {openDeliveryForm ? (
              <>
                <Row className="justify-content-center font-color">
                  {" "}
                  Choose A Date
                </Row>
                <DatePicker
                  className="form-control fw-300"
                  selected={dateTime}
                  onChange={onDateTimeChange}
                  showTimeSelect
                  isClearable
                  dateFormat="dd/MM/yyyy, hh:mm a"
                  placeholderText="No date&time set"
                  minDate={new Date()}
                />
                <Form>
                  <Row>
                    <Form.Group as={Col} controlId="formGridName">
                      <Row className='justify-content-center'>
                      <Form.Label className='font-color below'>Address</Form.Label>
                      </Row>
                      <Form.Control
                        required
                        type="text"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                        placeholder="Enter Address"
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="below" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="spg-button below" onClick={handleShippingInfo}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export { YourOrders };
