import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useState } from "react";

function RegistrationForm(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registrationSubmit = () => {
    if (name && surname && username && email) {
      //Need to call the API to insert into the DB
      alert("Inserimento riuscito con successo");
      console.log(name + " " + surname + " " + username + " " + email);
      props.changeAction(0);
    } else {
      //error in the input of the Data
      setErrorMessage("Missing Data");
    }
  };

  return (
    <>
      <Container className='justify-content-center'>
        <Row className='justify-content-center'>
          <h2>Register a new Client</h2>
        </Row>
        {errorMessage ? (
          <Alert variant='danger'> Missing Data, check all the fields</Alert>
        ) : (
          ""
        )}
        <Card className='below'>
          <Card.Header as='h5'>Fill the form</Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder='Enter Name'
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridSurname'>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type='text'
                    value={surname}
                    onChange={(ev) => setSurname(ev.target.value)}
                    placeholder='Surname'
                  />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridUsername'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    placeholder='Enter Username'
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder='Enter Email'
                  />
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Row className='justify-content-center'>
          <Button className='spg-button below' onClick={registrationSubmit}>
            Register
          </Button>
        </Row>
      </Container>
    </>
  );
}
export { RegistrationForm };
