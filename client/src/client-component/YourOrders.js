import {
  Row,
  Col,
  Button,
  Container,
  Spinner,
  Modal,
  Form,
  Alert,
  Table,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";
import API from "./../API";
import { getNextWeekday } from "../api/utility";
import { editIcon } from "../ui-components/Icons";
import { PageSection, BlockTitle } from "../ui-components/Page";

function YourOrders(props) {
  const [orders, setOrders] = useState([]);
  const [isOrderListLoading, setIsProductListLoading] = useState(true);
  const [openDeliveryForm, setOpenDeliveryForm] = useState(false);
  const [openPickupForm, setOpenPickupForm] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const onDateTimeChange = (newDate) => {
    setDateTime(() => newDate);
  };

  const handleShippingInfo = () => {
    setErrorMessage("");

    if (openPickupForm && dateTime) {
      API.deliveryOrder(selectedOrderId, dateTime);
      handleClose();
    } else if (openDeliveryForm && dateTime && address) {
      API.deliveryOrder(selectedOrderId, dateTime, address);
      props.addMessage("Request sned correctly");
      handleClose();
    } else {
      setErrorMessage("Insert a valid date and/or address");
    }
    setOpenDeliveryForm(false);
    setOpenPickupForm(false);
  };

  useEffect(() => {
    const fillOrders = async () => {
      let ordersTmp = await API.getOrders(props.user.email);

      setIsProductListLoading(false);
      if (!!ordersTmp) {
        setOrders(ordersTmp);
      }
    };
    fillOrders();
  }, [props.user.email]);

  return (
    <>
      <PageSection>
        {isOrderListLoading ? (
          <Container className='below'>
            <Spinner animation='border' variant='success'></Spinner>
          </Container>
        ) : (
          <>
            {orders.length !== 0 ? (
              <>
                <BlockTitle> List of your orders</BlockTitle>
                <Table responsive size='sm'>
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr className='over'>
                        <td> {order.price < 0.01 ? 0 : order.price}€</td>
                        <td> {order.status}</td>
                        {order.status === "booked" &&
                        ((props.dow === "Saturday" && props.hour >= 9) ||
                          (props.dow === "Sunday" && props.hour <= 23)) ? (
                          <td>
                            <Button
                              className='im-button im-animate'
                              onClick={() => props.modifyOrder(order.id)}>
                              {editIcon}
                            </Button>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        {order.status === "confirmed" &&
                        ((props.dow === "Monday" && props.hour >= 9) ||
                          (props.dow === "Tuesday" && props.hour <= 18)) ? (
                          <>
                            <td>
                              <Button
                                className='im-button im-animate'
                                onClick={() => {
                                  setShow(true);
                                  setSelectedOrderId(order.id);
                                }}>
                                Shipping Info
                              </Button>
                            </td>
                          </>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <BlockTitle>
                  {" "}
                  No orders found! Purchaise a &nbsp;
                  <Button
                    className='im-button'
                    onClick={() => props.changeAction(2)}>
                    New Order
                  </Button>
                </BlockTitle>
              </>
            )}
          </>
        )}
      </PageSection>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        className='im-modal'>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className='font-color'>Home Delivery or Pick-Up?</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage ? (
            <Alert
              variant='danger'
              onClose={() => setErrorMessage("")}
              dismissible>
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}
          <Form>
            <Form.Group>
              <Row>
                <Form.Check
                  label='Pick-Up'
                  type='radio'
                  name='group1'
                  id='pickup'
                  onClick={() => {
                    setOpenPickupForm(true);
                    setOpenDeliveryForm(false);
                  }}></Form.Check>
              </Row>
              <Row>
                <Form.Check
                  label='Home Delivery'
                  name='group1'
                  type='radio'
                  id='homedelivery'
                  onClick={() => {
                    setOpenDeliveryForm(true);
                    setOpenPickupForm(false);
                  }}></Form.Check>
              </Row>
            </Form.Group>

            {openPickupForm || openDeliveryForm ? (
              <>
                <Row className='justify-content-center font-color'>
                  Choose A Date
                </Row>
                <DatePicker
                  className='form-control fw-300'
                  selected={dateTime}
                  onChange={onDateTimeChange}
                  showTimeSelect
                  isClearable
                  dateFormat='dd/MM/yyyy, hh:mm a'
                  placeholderText='No date&time set'
                  minTime={
                    dayjs(dateTime).weekday() === 3
                      ? dayjs(dateTime).hour("9").minute("0").toDate()
                      : dayjs(dateTime).hour("0").minute("0").toDate()
                  }
                  maxTime={
                    dayjs(dateTime).weekday() === 5
                      ? dayjs(dateTime).hour("19").minute("0").toDate()
                      : dayjs(dateTime).hour("23").minute("59").toDate()
                  }
                  minDate={getNextWeekday(
                    props.virtualTimeDate,
                    2,
                    false
                  ).toDate()}
                  maxDate={getNextWeekday(
                    props.virtualTimeDate,
                    4,
                    false
                  ).toDate()}
                />
              </>
            ) : null}

            {openDeliveryForm ? (
              <Form>
                <Row>
                  <Form.Group as={Col} controlId='formGridName'>
                    <Row className='justify-content-center'>
                      <Form.Label className='font-color below'>
                        Address
                      </Form.Label>
                    </Row>
                    <Form.Control
                      required
                      type='text'
                      value={address}
                      onChange={(ev) => setAddress(ev.target.value)}
                      placeholder='Enter Address'
                    />
                  </Form.Group>
                </Row>
              </Form>
            ) : null}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='danger'
            className='below im-button im-animate'
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className='below im-button im-animate'
            onClick={handleShippingInfo}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export { YourOrders };
