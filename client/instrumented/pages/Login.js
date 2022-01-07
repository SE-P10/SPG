import { useState, React } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { plantIcon } from "../ui-components/Icons";
import { ToastProvider } from 'react-toast-notifications';
import { ToastNotification } from "../ui-components/ToastNotification";
import { Page } from "../ui-components/Page";

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
    <Page style={{ maxWidth: "400px" }}>
      <ToastProvider>
      <ToastNotification
        variant='danger'
        onSet={closeErrorMessage}
        content={errorMessage}
      />
      </ToastProvider>
      <Form className='im-container im-container--filled'>
      <ToastProvider>
        <ToastNotification
          variant='error'
          onSet={props.closeMessage}
          message={props.message.msg}
        />
        </ToastProvider>
        <Container className="over below">
          <Container className='mx-auto'>
            <Row className='align-center'>
              <div className="mx-auto im-svg-icon" style={{ width: '80px', height: '80px' }}>{plantIcon}</div>
            </Row>
            <Row className=''>
              <h2 className='navbar-link text-center'> Log In </h2>
            </Row>
            <Form.Group controlId='username' className='mt-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="im-input im-animate"
                type='text'
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="im-input im-animate"
                type='password'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </Form.Group>
          </Container>
          <Container className='mx-auto d-flex justify-content-center'>
            <Button
              variant='dark'
              className='below im-button im-animate mx-auto '
              onClick={handleSubmit}>
              Login
            </Button>
          </Container>
        </Container>
      </Form>
    </Page>
  );
}

export { LoginForm };
