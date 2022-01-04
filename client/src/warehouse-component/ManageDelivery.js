import { Button, Table, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import warehouseAPI from "../api/warehouse";
import { BlockTitle, PageSection } from "../ui-components/Page";

function ManageDelivery(props) {
  const [deliveries, setDeliveries] = useState([]);
  const [isDeliveryListLoading, setIsDeliveryListLoading] = useState(true);

  useEffect(() => {
    const getDeliveries = async () => {
      warehouseAPI.getOpenDeliveries().then((d) => {
        setIsDeliveryListLoading(false);
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
    <PageSection>
      <BlockTitle>Manage Deliveries</BlockTitle>

      {isDeliveryListLoading ? (
        <Spinner animation='border' variant='success' size='sm'></Spinner>
      ) : (
        <>
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
                    <tr key={d.id}>
                      <td></td>
                      <td>{d.farmer}</td>
                      <td>{d.productName}</td>
                      <td>{d.quantity}</td>
                      <td>
                        <Button
                          className='im-button im-animate'
                          onClick={() => handleConfirm(d.id)}>
                          Confirm
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <> No deliveries</>
          )}
        </>
      )}
    </PageSection>
  );
}
export { ManageDelivery };
