import "../css/custom.css";
import { Button, Alert, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

import { updateIcon, backIcon, confirmIcon } from "../ui-components/Icons";

import { UpdateAvailability } from "../farmer-component/UpdateAvailability";
import { ConfirmProducts } from "../farmer-component/ConfirmProducts";

function FarmerPage(props) {
  const [messageok, setMessageok] = useState("");
  const [actionF, setActionF] = useState(0);
  const changeAction = (actionN) => {
    setActionF(actionN);
  };

  const addMessage = (messageNew) => {
    setMessageok(messageNew);
  };
  return (
    <>
      {actionF !== 0 ? (
        <>
          <Button
            className='spg-button below back-button button-disappear'
            onClick={() => {
              setActionF(0);
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
          {" "}
          <h2> {props.user.name} farmer personal page </h2>{" "}
        </Row>
        {messageok ? (
          <Alert variant='success' onClose={() => setMessageok("")} dismissible>
            {" "}
            {messageok}{" "}
          </Alert>
        ) : (
          ""
        )}

        <Row className='mx-auto below'>
          {actionF === 0 ? (
            <>
              {" "}
              <Col></Col>
              <Col className=' justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionF(1);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{updateIcon} </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      Update Products Availability{" "}
                    </Row>
                  </Col>
                </Button>
              </Col>
              <Col className=' justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setActionF(2);
                  }}>
                  <Col className='justify-content-center'>
                    <Row className='justify-content-center'>{confirmIcon} </Row>
                    <Row className='justify-content-center'>
                      {" "}
                      Confirm Products{" "}
                    </Row>
                  </Col>
                </Button>
              </Col>
              <Col></Col>
            </>
          ) : (
            ""
          )}
        </Row>
        <Row className='below'>
          {actionF === 1 ? (
            <>
              {(props.dow === "Friday" && props.hour > 18) ||
              (props.dow === "Saturday" && props.hour < 9) ? (
                <UpdateAvailability
                  changeAction={changeAction}
                  addMessage={addMessage}
                  user={props.user}
                />
              ) : (
                "You can Update Availability from Friday at 18:00 to Saturday at 09:00"
              )}{" "}
            </>
          ) : null}

          {actionF === 2 ? (
            <>
              {(props.dow === "Sunday" && props.hour >= 23) ||
              (props.dow === "Monday" && props.hour < 9) ? (
                <ConfirmProducts
                  changeAction={changeAction}
                  addMessage={addMessage}
                  user={props.user}
                />
              ) : (
                "You can Confirm Product between Sunday at 23:00 and Monday at 09:00"
              )}{" "}
            </>
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export { FarmerPage };
