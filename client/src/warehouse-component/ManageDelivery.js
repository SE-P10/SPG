import { Container, Row, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../css/custom.css";
import warehouseAPI from "../api/warehouse";

function ManageDelivery(props) {
  const [deliveries, setDeliveries] = useState([]);
  const [isDeliveryListLoading, setIsDeliveryListLoading] = useState(true);

  useEffect(() => {
    const getDeliveries = async () => {
      warehouseAPI.getOpenDeliveries().then((d) => {
        setDeliveries(d);
      });
    };

    getDeliveries();
  }, [isDeliveryListLoading]);

  const handleConfirm = async (deliveryId) => {
    setIsDeliveryListLoading((old) => !old);
    warehouseAPI.confirmDelivery(deliveryId);
  };

  return (
    <>
      <Row className='justify-content-center'>
        {" "}
        <h2> Manage Deliveries</h2>{" "}
      </Row>
      <Container className='justify-content-center cont'>
        {deliveries.length ? (
          <>
            <Table responsive size='sm'>
              <thead>
                <tr>
                  <th></th>
                  <th>Farmer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((d) => (
                  <tr>
                    <td></td>
                    <td>{d.farmer}</td>
                    <td>{d.productName}</td>
                    <td>{d.quantity}</td>
                    <td>
                      {" "}
                      <Button
                        className='spg-button'
                        onClick={() => handleConfirm(d.id)}>
                        {" "}
                        Confirm
                      </Button>
                    </td>
                  </tr>
                ))}{" "}
              </tbody>
            </Table>
          </>
        ) : (
          <> No deliveries</>
        )}
      </Container>
    </>
  );
}
export { ManageDelivery };
