import { Row, Col, Table, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import API from "../API";
import { BlockTitle, PageSection } from "../ui-components/Page";
import { ToastNotification } from "../ui-components/ToastNotification";
import notificationAPI from "../api/notificationAPI";

function PendingOrders(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [mailContactInfo, setMailContactInfo] = useState("");
  const [show, setShow] = useState(false);
  const [userTmp, setUserTmp] = useState("")

  const handleClose = () => setShow(false);
  useEffect(() => {
    const fillTables = async () => {
      const ordersTmp = await API.getPendingOrders();
      setOrders(ordersTmp);
    };

    fillTables();
  }, []);

  const sendNotification = (user_id) => {
    const addNot = notificationAPI.addNotification(
      user_id,
      "That's a reminder from the shop employee: top up your wallet!",
      "Reminder"
    );

    addNot.then((r) => console.log(r));
  };

  const openUserInfo = async (email) =>{
    setMailContactInfo(email);
    API.getUserInfo(email)
    .then((obj) => {
    setUserTmp(obj)
    console.log(obj)
    setShow(true)}).catch((e)=>console.log(e))

    
  }

  return (
    <PageSection>
      <BlockTitle>Pending Orders</BlockTitle>
      <ToastNotification
        variant='error'
        onSet={() => setErrorMessage("")}
        message={errorMessage}
      />
      <Col>
        <Row className='justify-content-center'>
          {orders.length !== 0 ? (
            <h3 className='thirdColor'> List of the pending orders </h3>
          ) : (
            ""
          )}
        </Row>
        {
          orders.length === 0 ? <h3>There are no pending orders</h3> :
            <Table responsive size='sm'>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      {order.user.name} {order.user.surname}
                    </td>
                    <td> {order.price}</td>
                    <td> {order.status}</td>
                    <td>
                      <Button className='im-button' onClick={() => openUserInfo(order.user.email)}>
                        Contact info
                      </Button>
                    </td>
                    <td>
                      <Button
                        className='im-button'
                        onClick={() => sendNotification(order.user_id)}>
                        Send a reminder
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
        }
      </Col>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>User info</Modal.Title>
        </Modal.Header>
        <Modal.Body> <p>User mail : {mailContactInfo} </p> <p>Number : +39 {userTmp.phone} {} </p></Modal.Body>
        <Modal.Footer>
          <Button className='im-button' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </PageSection>
  );
}
export { PendingOrders };
