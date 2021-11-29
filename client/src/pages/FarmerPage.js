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
    1 = Update Availability
    */

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

        <Row className=' justify-content-center below'>
          <Col>
            {action === 0 ? (
              <Row className=' justify-content-center below'>
                <Button
                  className='se-button '
                  onClick={() => {
                    setAction(1);
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
          {action === 1 ? (
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
