import { Container, Row } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";

function HandOut(props) {
  const handleSearch = (email) => {
    // order Id = API GetOrdersByEmail(email)
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        {" "}
        <h2> Hand out an Order</h2>{" "}
      </Row>
      <Row>
        {" "}
        <SearchComponent className='mx-auto' />{" "}
      </Row>
    </Container>
  );
}
export { HandOut };
