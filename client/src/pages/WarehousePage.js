import { Container, Row, Button, Col } from "react-bootstrap";
import { useState } from "react";
import { backIcon, deliveryIcon } from "../ui-components/Icons";
import { ManageDelivery } from "../warehouse-component/ManageDelivery";

import "../css/custom.css";

function WarehousePage(props) {
  const [actionC, setActionC] = useState(0);
  const changeAction = (actionN) => {
    setActionC(actionN);
  };
  return (
    <>
      {actionC !== 0 ? (
        <>
          <Button
            className='spg-button below back-button'
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
      <Container className='text-dark below'>
        <Row className=' cont below justify-content-center'>
          {props.user.name ? <h2> {props.user.name} </h2> : null}
        </Row>
        <Row className='secondColor justify-content-center below'>
          <Col>
            {actionC === 0 ? (
              <>
                {" "}
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
                            {deliveryIcon}
                          </Row>
                          <Row className='justify-content-center'>
                            {" "}
                            Manage Deliveries
                          </Row>
                        </Col>{" "}
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row className='below'>
          {actionC === 1 ? <ManageDelivery user={props.user} /> : null}
        </Row>
      </Container>
    </>
  );
}

export { WarehousePage };