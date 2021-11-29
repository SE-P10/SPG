import "../css/custom.css";
import {
  Button,
  Alert,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Container,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import "../css/custom.css";
import gAPI from "../api/gAPI";
import { updateIcon, backIcon } from "../ui-components/Icons";

import { UpdateAvailability } from "../farmer-component/UpdateAvailability";

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
            className='spg-button below back-button'
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

        <Row className=' justify-content-center below'>
          <Col>
            {actionF === 0 ? (
              <Row className=' justify-content-center below'>
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
              </Row>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row className='below'>
          {actionF === 1 ? (
            <UpdateAvailability
              changeAction={changeAction}
              addMessage={addMessage}
              user={props.user}
            />
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export { FarmerPage };
