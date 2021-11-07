import { Container, Row, Form, Col } from "react-bootstrap";
function RegistrationForm(props) {
  return (
    <>
      <Container className='justify-content-center'>
        <Form>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='email' placeholder='Enter Name' />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridSurname'>
              <Form.Label>Surname</Form.Label>
              <Form.Control type='password' placeholder='Surname' />
            </Form.Group>
          </Row>
        </Form>
      </Container>
    </>
  );
}
export { RegistrationForm };
