import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { HandOut } from "../shopEmployee-component/HandOut";
import { CheckOrders } from "../ui-components/CheckOrders";
import { NewOrder } from "../ui-components/NewOrder";
import { TopUpWallet } from "../shopEmployee-component/TopUpWallet.js";
import { RegistrationForm } from "../ui-components/RegistrationForm";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import "../css/custom.css";
import {
  registerIcon,
  newIcon,
  handOutIcon,
  pigIcon,
  browseIcon,
  checkIcon,
  pendingIcon,
  backIcon,
} from "../ui-components/Icons.js";
import { PendingOrders } from "../shopEmployee-component/PendingOrders.js";
import gAPI from "../api/gAPI";

function ShopEmployee(props) {
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
    1 = Register New client 
    2 = Browser Product 
    3 = TopUp a Wallet
    4 = New Order 
    5 = HandOut
    6 = Check Orders 
    7 = Show pending orders*/

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
      <Container className='below '>
        {message ? (
          <Alert variant='success' onClose={() => setMessage("")} dismissible>
            {" "}
            {message}{" "}
          </Alert>
        ) : (
          ""
        )}

        <Row>
          <Row>
            {action === 1 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Register a new client </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {action === 2 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Browse Products </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {action === 3 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Top Up a Wallet </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {action === 4 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> New order </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {action === 5 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Hand Out </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {action === 6 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Check Orders </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {action === 7 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Pending Orders </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
          </Row>
          <Col className='ml-4'>
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(1);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>
                      {registerIcon}{" "}
                    </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      Register client{" "}
                    </Row>
                  </Col>
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
                  {" "}
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{browseIcon} </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      Browse Products{" "}
                    </Row>
                  </Col>
                </Button>
              </Row>
            ) : (
              ""
            )}
          </Col>
          <Col>
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button'
                  onClick={() => {
                    setAction(7);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{pendingIcon} </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      Pending orders{" "}
                    </Row>
                  </Col>
                </Button>
              </Row>
            ) : (
              ""
            )}
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button'
                  onClick={() => {
                    setAction(3);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{pigIcon} </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      TopUp a Wallet{" "}
                    </Row>
                  </Col>
                </Button>
              </Row>
            ) : (
              ""
            )}
          </Col>
          <Col>
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(4);
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
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(5);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{handOutIcon} </Row>
                    <Row className='justify-content-center'> Hand Out </Row>
                  </Col>
                </Button>
              </Row>
            ) : (
              ""
            )}
          </Col>{" "}
          <Col>
            {action === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(6);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{checkIcon} </Row>
                    <Row className='justify-content-center'> Check Orders </Row>
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
            <RegistrationForm
              loggedIn={props.loggedIn}
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {action === 2 ? (
            <BrowserProducts
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {action === 3 ? (
            <TopUpWallet
              changeAction={changeAction}
              addMessage={addMessage}
              className='justify-content-center'
            />
          ) : null}
          {action === 4 ? (
            <NewOrder changeAction={changeAction} addMessage={addMessage} />
          ) : null}
          {action === 7 ? (
            <PendingOrders
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {action === 5 ? (
            <HandOut changeAction={changeAction} addMessage={addMessage} />
          ) : null}
          {action === 6 ? (
            <CheckOrders changeAction={changeAction} addMessage={addMessage} />
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export { ShopEmployee };
