import "../css/custom.css";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ClientOrder } from "../client-component/ClientOrder";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import "../css/custom.css";
import { YourOrders } from "../client-component/YourOrders";
import {
  backIcon,
  newIcon,
  browseIcon,
  checkIcon,
  mailIcon,
} from "../ui-components/Icons.js";
import { ClientNotifications } from "../client-component/ClientNotifications";

import API from "../API";
function ClientPage(props) {
  const [message, setMessage] = useState("");
  const [actionC, setActionC] = useState(0);
  const [modifyOrder, setModifyOrder] = useState(-1);
  const changeAction = (actionN) => {
    setActionC(actionN);
  };

  useEffect(() => {
    if (actionC !== 2) setModifyOrder(-1);
    API.deleteAllBasket().catch(() => {
      setMessage("Carello non liberato correttamente");
      console.log("errore");
    });
  }, [actionC]);

  const modifyOrderFunc = (orderId) => {
    setModifyOrder(orderId);
    setActionC(2);
  };

  const addMessage = (messageN) => {
    setMessage(messageN);
  };

  return (
    <>
      {actionC !== 0 ? (
        <>
          <Button
            className='spg-button below back-button button-disappear'
            onClick={() => {
              setActionC(0);
            }}>
            {" "}
            {backIcon}{" "}
          </Button>
        </>
      ) : (
        ""
      )}{" "}
      <Container className='below'>
        {message ? (
          <Alert variant='success' onClose={() => setMessage("")} dismissible>
            {" "}
            {message}{" "}
          </Alert>
        ) : (
          ""
        )}

        <Row className=' justify-content-center below'>
          <Col>
            {actionC === 0 ? (
              <>
                <Row className=' cont below justify-content-center'>
                  {props.user.name ? (
                    <h2> {props.user.name} personal page </h2>
                  ) : null}
                </Row>{" "}
                <Row>
                  <Col>
                    <Row className='secondColor justify-content-center below'>
                      <Button
                        className='se-button '
                        onClick={() => {
                          setActionC(1);
                        }}>
                        <Col className='justify-content-center'>
                          <Row className='justify-content-center'>
                            {browseIcon}{" "}
                          </Row>
                          <Row className='justify-content-center'>
                            {" "}
                            Browse Products{" "}
                          </Row>
                        </Col>{" "}
                      </Button>
                    </Row>
                  </Col>
                  <Col>
                    <Row className='secondColor justify-content-center below'>
                      <Button
                        className='se-button '
                        onClick={() => {
                          setActionC(2);
                        }}>
                        <Col className='justify-content-center'>
                          <Row className='justify-content-center'>
                            {newIcon}{" "}
                          </Row>
                          <Row className='justify-content-center'>
                            {" "}
                            New Order{" "}
                          </Row>
                        </Col>
                      </Button>
                    </Row>
                  </Col>
                  <Col>
                    <Row className='secondColor justify-content-center below'>
                      <Button
                        className='se-button '
                        onClick={() => {
                          setActionC(3);
                        }}>
                        <Col className='justify-content-center'>
                          <Row className='justify-content-center'>
                            {checkIcon}{" "}
                          </Row>
                          <Row className='justify-content-center'>
                            {" "}
                            Your Orders{" "}
                          </Row>
                        </Col>
                      </Button>
                    </Row>{" "}
                  </Col>
                  <Col>
                    <Row className='secondColor justify-content-center below'>
                      <Button
                        className='se-button '
                        onClick={() => {
                          setActionC(4);
                        }}>
                        <Col className='justify-content-center'>
                          <Row className='justify-content-center'>
                            {mailIcon}{" "}
                          </Row>
                          <Row className='justify-content-center'>
                            {" "}
                            Personal MailBox{" "}
                          </Row>
                        </Col>
                      </Button>
                    </Row>{" "}
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row className='below'>
          {actionC === 1 ? (
            <BrowserProducts
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {actionC === 2 ? (
            <>
              {(props.dow === "Saturday" && props.hour >= 9) ||
              (props.dow === "Sunday" && props.hour <= 23) ? (
                <ClientOrder
                  modifyOrder={modifyOrder}
                  user={props.user}
                  changeAction={changeAction}
                  addMessage={addMessage}
                />
              ) : (
                "You can purchase an order from Saturday at 09:00 and Sunday at 23:00"
              )}
            </>
          ) : null}
          {actionC === 3 ? (
            <YourOrders
              virtualTimeDate={props.virtualTimeDate}
              hour={props.hour}
              dow={props.dow}
              modifyOrder={modifyOrderFunc}
              user={props.user}
              changeAction={changeAction}
              addMessage={addMessage}
            />
          ) : null}
          {actionC === 4 ? (
            <ClientNotifications
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
