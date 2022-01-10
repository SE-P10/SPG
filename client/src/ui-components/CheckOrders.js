import { Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import { SearchComponent } from "./SearchComponent";
import API from "./../API";
import { BlockTitle, PageSection } from "../ui-components/Page";
import { ToastNotification } from "../ui-components/ToastNotification";

function CheckOrders(props) {

  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (email) => {
    let ordersTmp = [];
    if (orders.length !== 0) setOrders([]);
    ordersTmp = await API.getOrders(email);
    if (ordersTmp.length === 0) {
      setErrorMessage("No orders found for this user.");
    } else {
      setOrders(ordersTmp);
    }
  };

  return (
    <PageSection>
      <BlockTitle>
        Check Orders
      </BlockTitle>
      <ToastNotification variant='error' onSet={() => setErrorMessage("")} message={errorMessage} />
      <Row>
        <SearchComponent className='mx-auto' handleSearch={handleSearch} />
      </Row>
      <Col className="below">
        <Row className='justify-content-center'>
          {orders.length !== 0 ?
            <>
              <BlockTitle className="below-2"> List of orders </BlockTitle>
              <Table responsive size='sm'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr className='over' key={order.id}>
                      <td> {order.id}</td>
                      <td> {order.price < 0.01 ? 0 : order.price}</td>
                      <td> {order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
            :
            <></>
          }
        </Row>
      </Col>
    </PageSection>
  );
}
export { CheckOrders };
