import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { HandOut } from "../shopEmployee-component/HandOut";
import { CheckOrders } from "../ui-components/CheckOrders";
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
import { ClientOrder } from "../client-component/ClientOrder";

function ShopEmployee(props) {
  const [message, setMessage] = useState("");
  const [actionS, setActionS] = useState(0);
  const changeAction = (actionN) => {
    setActionS(actionN);
  };

  const addMessage = (messageN) => {
    setMessage(messageN);
  };

  return (
    <>
      {actionS !== 0 ? (
        <>
          <Button
            className='spg-button below back-button'
            onClick={() => {
              setActionS(0);
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
            {actionS === 1 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Register a new client </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {actionS === 2 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Browse Products </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {actionS === 3 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Top Up a Wallet </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {actionS === 4 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> New order </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {actionS === 5 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Hand Out </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {actionS === 6 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Check Orders </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
            {actionS === 7 ? (
              <>
                {" "}
                <Col md='auto'>
                  <h1 className='mx-auto'> Pending Orders </h1>{" "}
                </Col>
              </>
            ) : null}{" "}
          </Row>
          <Col className='ml-4'>
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionS(1);
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
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionS(2);
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
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button'
                  onClick={() => {
                    setActionS(7);
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
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button'
                  onClick={() => {
                    setActionS(3);
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
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionS(4);
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
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionS(5);
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
            {actionS === 0 ? (
              <Row className='secondColor justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionS(6);
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
          {actionS === 1 ? (
            <RegistrationForm
              loggedIn={props.loggedIn}
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {actionS === 2 ? (
            <BrowserProducts
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {actionS === 3 ? (
            <TopUpWallet
              changeAction={changeAction}
              addMessage={addMessage}
              className='justify-content-center'
            />
          ) : null}
          {actionS === 4 ? (
            <ClientOrder
              changeAction={changeAction}
              addMessage={addMessage}
              user={props.user}
            />
          ) : null}
          {actionS === 7 ? (
            <PendingOrders
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {actionS === 5 ? (
            <HandOut changeAction={changeAction} addMessage={addMessage} />
          ) : null}
          {actionS === 6 ? (
            <CheckOrders changeAction={changeAction} addMessage={addMessage} />
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export { ShopEmployee };
