import {
  Row,
  Form,
  Col,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../API";
import { ToastNotification } from "./ToastNotification";
import { BlockTitle, PageSection } from "./Page";

function RegistrationForm(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone,setPhone] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleModalClose = () => setShow(false);
  const registrationSubmit = (event) => {
    event.preventDefault();

    if (name && surname && username && email && password && confirmPassword && phone) {
      if (password === confirmPassword) {
        //Need to call the API to insert into the DB
        //alert("Inserimento riuscito con successo");
        let newClient = {
          email: email,
          password: password,
          username: username,
          name: name,
          surname: surname,
          phone: phone,
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

  return (
    <>
      <ToastNotification
        variant='error'
        onSet={() => setErrorMessage("")}
        message={errorMessage}
      />
      <PageSection>
        <BlockTitle>Registration form</BlockTitle>
        <Card>
          <Card.Header as='h5'>Fill the form</Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-3'>
                <Form.Group as={Col} sm>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder='Enter Name'
                  />
                </Form.Group>
                <Form.Group as={Col} sm>
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
                <Form.Group as={Col} sm>
                  <Form.Label>Telegram Username</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                    placeholder='Enter your Telegram Username'
                  />
                </Form.Group>

                <Form.Group as={Col} sm>
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

              <Row>
              <Form.Group as={Col} sm>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    placeholder='Enter Phone Number'
                  />
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} sm>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    placeholder='Enter Password'
                  />
                </Form.Group>

                <Form.Group as={Col} sm>
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
          <Card.Footer className="d-flex justify-content-center">
            <Button className='im-button im-animate' onClick={registrationSubmit}>
              Register
            </Button>
          </Card.Footer>
        </Card>

        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header>
            <Modal.Title>Registration was successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center">
              <img src={process.env.PUBLIC_URL + "/images/telegram.svg"} alt="telegram qrcode" />
            </Row>
            <Row className="justify-content-center">
              <p className="telegramColor">Scan the Telegram QR code, so you can recive all the updates or <a href="https://t.me/spg10_bot"> click here</a></p>
            </Row>
            Do you want to login, now?

          </Modal.Body>
          <Modal.Footer>
            <Link to="/login" >
              <Button className='below im-button im-animate' >
                YES
              </Button>
            </Link>
            <Link to="/" >
              <Button className='below im-button im-animate' variant='danger' >
                NO
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </PageSection>
    </>
  );
}
export { RegistrationForm };
