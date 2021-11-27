import "../css/custom.css";
import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { ClientOrder } from "../client-component/ClientOrder";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import "../css/custom.css";
import { backIcon, newIcon, browseIcon } from "../ui-components/Icons.js";

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
      {action !== 0 ? (
        <>
          <Button
            className='spg-button below back-button'
            onClick={() => {
              setAction(0);
            }}>
            {" "}
            {backIcon}{" "}
          </Button>
        </>
      ) : (
        ""
      )}{" "}
      <Container className='below'>
        <Row className=' cont below justify-content-center'>
          {console.log(props.user)}
          {props.user.name ? <h2> {props.user.name} personal page </h2> : null}
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
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(1);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{browseIcon} </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      Browse Products{" "}
                    </Row>
                  </Col>{" "}
                </Button>
              </Row>
            ) : (
              ""
            )}

            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(2);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{newIcon} </Row>
                    <Row className='justify-content-center'> New Order </Row>
                  </Col>
                </Button>
              </Row>
            ) : (
              ""
            )}
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
