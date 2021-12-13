import { useState, React } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { plantIcon } from "../ui-components/Icons";
import "../css/custom.css";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };

    // SOME VALIDATION, ADD MORE!!!
    let valid = true;
    if (username === "" || password === "") {
      //nessun vincolo sulla password
      valid = false;
      setErrorMessage("Insert email and password to access.");
    }

    if (valid) {
      setErrorMessage("");
      props.login(credentials);
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <Container>
      {errorMessage !== "" ? (
        <Alert
          className='justify-content-center below'
          variant='danger'
          onClose={closeErrorMessage}
          dismissible>
          {" "}
          {errorMessage}{" "}
        </Alert>
      ) : (
        <></>
      )}
      <Form className='below  cont'>
        {props.message !== "" ? (
          <Alert
            className='justify-content-center below'
            variant={props.message.type}
            onClose={props.closeMessage}
            dismissible>
            {" "}
            {props.message.msg}{" "}
          </Alert>
        ) : (
          <></>
        )}

        <Row>
          <Col sm={8} className='mx-auto'>
            <Row className=' mx-auto justify-content-center'>
              <h1 className='navbar-link'> {plantIcon}</h1>
            </Row>
            <Row className=' mx-auto justify-content-center'>
              <h2 className='navbar-link'> Log In </h2>
            </Row>
            <Form.Group controlId='username' className='mt-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={8} className='mx-auto'>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </Form.Group>
            <Button
              variant='dark'
              className='mainColor below spg-button border mx-auto'
              onClick={handleSubmit}>
              Login
            </Button>
          </Col>
        </Row>
        <br />
      </Form>
    </Container>
  );
}

export {LoginForm};
