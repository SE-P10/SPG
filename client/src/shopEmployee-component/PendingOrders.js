import { Row, Col, Table, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import API from "../API";
import { BlockTitle, PageSection } from "../ui-components/Page";
import { ToastNotification } from "../ui-components/ToastNotification";
import notificationAPI from "../api/notificationAPI";

function PendingOrders(props) {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
            {orders.length === 0 ? <h3>There are no pending orders</h3> : ""}
            {orders.map((order) => (
              <tr>
                <td>
                  {" "}
                  {order.user.name} {order.user.surname}{" "}
                </td>
                <td> {order.price}</td>
                <td> {order.status}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle className='im-button'>
                      Contact info
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>{order.user.email}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>{" "}
                <td>
                  {" "}
                  <Button
                    className='im-button'
                    onClick={() => sendNotification(order.user_id)}>
                    {" "}
                    Send a reminder{" "}
                  </Button>
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </Table>
      </Col>
    </PageSection>
  );
}
export { PendingOrders };
