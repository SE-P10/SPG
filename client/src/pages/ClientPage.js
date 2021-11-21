import "../css/custom.css";
import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { ClientOrder } from "../client-component/ClientOrder";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import "../css/custom.css";



function ClientPage(props) {
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
            <h2> {props.user.name} personal page </h2>{" "}
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
                user={props.user}
                changeAction={changeAction}
                addMessage={addMessage}
              />
            ) : null}
            
          </Row>
        </Container>
      </>
    );
}

export { ClientPage };
