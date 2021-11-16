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
import API from "../API";

function RegistrationForm(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registrationSubmit = () => {
    if (name && surname && username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        //Need to call the API to insert into the DB
        //alert("Inserimento riuscito con successo");
        let newClient = {
          email: email,
          password: password,
          username: username,
          name: name,
          surname: surname,
        };
        API.addClient(newClient)
          .then((e) => { props.addMessage('New client registered'); console.log(''); props.changeAction(0);})
          .catch((e) => {
            console.log(e.error);
            setErrorMessage(e.error);
          });

        
      } else {
        //password mismatch
        setErrorMessage("Password Mismatch");
      }
    } else {
      //error in the input of the Data
      setErrorMessage("Missing Data, check all the fields");
    }
  };

  return (
    <>
      <Container className='justify-content-center cont'>
        <Row className='justify-content-center'>
          <h2>Register a new Client</h2>
        </Row>
        {errorMessage ? (
          <Alert
            variant='danger'
            onClose={() => setErrorMessage("")}
            dismissible>
            {" "}
            {errorMessage}{" "}
          </Alert>
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
                    required
                    type='text'
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder='Enter Name'
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridSurname'>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    required
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
                    required
                    type='text'
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    placeholder='Enter Username'
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type='email'
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder='Enter Email'
                  />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    placeholder='Enter Password'
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridConfirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    value={confirmPassword}
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    placeholder='Confirm Password'
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
