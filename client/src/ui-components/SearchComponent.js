import { Container, Card, Button, Form } from "react-bootstrap";
import { useState } from "react";

function SearchComponent(props) {
  const [email, setEmail] = useState(null);
  return (
    <Container className='justify-content-center below'>
      <Card>
        <Card.Header as='h5'>Search </Card.Header>
        <Card.Body>
          <Card.Title>Insert client email to procede:</Card.Title>
          <Card.Text>

            <Form.Control
              className="im-input"
              type='text'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </Card.Text>
          <Button
            className='below im-button im-animate'
            onClick={() => props.handleSearch(email)}>
            Search
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
export { SearchComponent };
