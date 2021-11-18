import "../css/custom.css";
import { Container, Row } from "react-bootstrap";

function FarmerPage(props) {
  return (
    <Container className='below'>
      <Row className=' cont below justify-content-center'>
        {" "}
        <h2> {props.user.name} personal page </h2>{" "}
      </Row>
    </Container>
  );
}

export { FarmerPage };
