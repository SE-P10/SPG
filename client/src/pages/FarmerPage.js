import "../css/custom.css";
import { Container, Row } from "react-bootstrap";

function FarmerPage(props) {
  const [message, setMessage] = useState("");
  const [action, setAction] = useState(0);
  const changeAction = (actionN) => {
    setAction(actionN);
  };

  const addMessage = (messageN) => {
    setMessage(messageN);
  };
  /* Actions 
    0 = No actions (Home)
    1 = Browse products 
    2 = NewOrder*/

    return (
      <>
        <Container className='below'>
          <Row className=' cont below justify-content-center'>
            {" "}
            <h2> {props.user.name} farmer personal page </h2>{" "}
          </Row>
          {message ? (
            <Alert variant='success' onClose={() => setMessage("")} dismissible>
              {" "}
              {message}{" "}
            </Alert>
          ) : (
            ""
          )}
  
          <Row className='secondColor justify-content-center below'>
            <Col>

              {action === 0 ? 
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button btn-block'
                  onClick={() => {
                    setAction(1);
                  }}>
                  Browse products
                </Button>
              </Row>
              : ""}


                {action === 0 ? 
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button btn-block'
                  onClick={() => {
                    setAction(2);
                  }}>
                  New Order
                </Button>
              </Row>
              : ""}

              </Col>

                


         </Row>
          <Row className='below'>
            {action === 1 ? (
              <BrowserProducts
                changeAction={changeAction}
                addMessage={addMessage}
              />
            ) : null}
            {action === 2 ? (
              <ClientOrder
                changeAction={changeAction}
                addMessage={addMessage}
              />
            ) : null}
            
          </Row>
        </Container>
      </>
    );
}

export { FarmerPage };
