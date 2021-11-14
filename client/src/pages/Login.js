import { useState } from "react";
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
    }

    if (valid) {
      setErrorMessage("");
      props.login(credentials);
    }
  };

  return (
    <Container className='below  cont'>
      <Form>
        {props.message !== "" ? (
          <Alert
            className='justify-content-center'
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
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
