import { Container } from "react-bootstrap";
import { useState } from "react";
import "../css/custom.css";

function ManageDelivery(props) {
  const [deliveries, setDeliveries] = useState(null);

  return (
    <>
      <Container className='justify-content-center cont'>
        {deliveries ? <></> : <> No deliveries</>}
      </Container>
    </>
  );
}
export { ManageDelivery };