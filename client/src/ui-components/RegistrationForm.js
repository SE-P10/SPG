import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Alert,
  Card,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
  const history = useNavigate();
  const [show, setShow] = useState(false);

  const handleModalClose = () => setShow(false);

  const registrationSubmit = (event) => {
    event.preventDefault();

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
          .then((e) => {
            //if Employee calls add client
            if (props.loggedIn) {
              props.addMessage("New client registered");
              props.changeAction(0);
            }
            //if unregisterd user calls add client
            else {
              setShow(true);
            }
          })
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

  const goToLogin = () => {
    history.push("/login");
  };
  const goToRoot = () => {
    history.push("/");
  };

  return (
    <>
      <Container className='justify-content-center below'>
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
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header>
            <Modal.Title>Registration was successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to login,now?</Modal.Body>
          <Modal.Footer>
            <Button className='spg-button below' onClick={goToLogin}>
              YES
            </Button>
            <Button className='below' variant='danger' onClick={goToRoot}>
              NO
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
export { RegistrationForm };
