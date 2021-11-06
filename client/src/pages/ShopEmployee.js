import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "../css/custom.css";

function ShopEmployee(props) {
  return (
    <>
      <Container>
        <Row className='secondColor justify-content-center'>
          {" "}
          <h2> ShopEmployee personal page </h2>{" "}
        </Row>
        <Row className='secondColor justify-content-center below'>
          <Col>
            <Row className='secondColor justify-content-center below'>
              <Button className='se-button btn-block'>Register a Client</Button>
            </Row>
            <Row className='secondColor justify-content-center below'>
              <Button className='se-button btn-block'>Browse Products</Button>
            </Row>
            <Row className='secondColor justify-content-center below'>
              <Button className='se-button btn-block'>TopUp a Wallet</Button>
            </Row>
          </Col>

          <Col className='ml-2'>
            <Row className='secondColor justify-content-center below'>
              <Button className='se-button btn-block'>New Order</Button>
            </Row>
            <Row className='secondColor justify-content-center below'>
              <Button className='se-button btn-block'>HandOut</Button>
            </Row>
            <Row className='secondColor justify-content-center below'>
              <Button className='se-button btn-block'>Check Order</Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { ShopEmployee };
