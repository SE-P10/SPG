import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { HandOut } from "../ui-components/HandOut.js";
import { CheckOrders } from "../ui-components/CheckOrders";
import { NewOrder } from "../ui-components/NewOrder";
import { TopUpWallet } from "../ui-components/TopUpWallet.js";
import { RegistrationForm } from "../ui-components/RegistrationForm";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import "../css/custom.css";
import { PendingOrders } from "../ui-components/PendingOrders.js";
import AFApi from "../api/a-API";
import gAPI from "../gAPI";
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
      <Container className='below '>
        {message ? (
          <Alert variant='success' onClose={() => setMessage("")} dismissible>
            {" "}
            {message}{" "}
          </Alert>
        ) : (
          ""
        )}

        <Row className=' below'>
          <Row>
            {action !== 0 ? (
              <>
                <Button
                  variant='primary'
                  className='spg-button below'
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
            {action === 1 ? (
              <>
                {" "}
                <h1 className='ml-auto'> Register a new client </h1>{" "}
              </>
            ) : null}{" "}
          </Row>
          <Col>
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
          <Col className='ml-2'>
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
