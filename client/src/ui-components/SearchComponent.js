import { Container, Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import "../css/custom.css";

function SearchComponent(props) {
  const [email, setEmail] = useState(null);
  return (
    <>
      <Container className='justify-content-center below mb-4'>
        <Card>
          <Card.Header as='h5'>Search </Card.Header>
          <Card.Body>
            <Card.Title>Insert client email to procede:</Card.Title>
            <Card.Text>
              {" "}
              <Form.Control
                type='text'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />{" "}
            </Card.Text>
            <Button
              className='spg-button'
              onClick={() => props.handleSearch(email)}>
              Search
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export { SearchComponent };
