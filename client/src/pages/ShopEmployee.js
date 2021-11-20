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
import gAPI from "../gAPI";


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
      <Container className='below'>
        <Row className=' cont below justify-content-center'>
          {" "}
          <h2> ShopEmployee personal page </h2>{" "}
        </Row>
        <Row> 
        {action !== 0 ?  <Button variant="primary" onClick={() => {setAction(0)}}> Back to Menu </Button> : ""}
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
          { action === 0 ?  
            <Row className='secondColor justify-content-center below'>
             
              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(1);
                }}>
                Register a Client
              </Button>
         
            </Row> : ""}
            { action === 0 ?  
            <Row className='secondColor justify-content-center below'>
             

              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(2);
                }}>
                Browse Products
              </Button> 
            </Row> : ""}
            { action === 0 ?  
            <Row className='secondColor justify-content-center below'>

              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(7);
                }}>
                Pending orders
              </Button> 
            </Row> : ""}
            { action === 0 ?  
            <Row className='secondColor justify-content-center below'>

              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(3);
                }}>
                TopUp a Wallet
              </Button> 
            </Row> : ""}
          </Col>

          <Col className='ml-2'>
          { action === 0 ?  
            <Row className='secondColor justify-content-center below'>

              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(4);
                }}>
                New Order
              </Button> 
            </Row> : ""}
            { action === 0 ?  
            <Row className='secondColor justify-content-center below'>

              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(5);
                }}>
                HandOut
              </Button> 
            </Row> : ""}
            { action === 0 ?  
            <Row className='secondColor justify-content-center below'>
            

              <Button
                className='se-button btn-block'
                onClick={() => {
                  setAction(6);
                }}>
                Check Orders
              </Button>
              
            </Row>
            : ""}
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
            <PendingOrders changeAction={changeAction} addMessage={addMessage} />
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
