import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { HandOut } from "../shopEmployee-component/HandOut";
import { CheckOrders } from "../ui-components/CheckOrders";
import { TopUpWallet } from "../shopEmployee-component/TopUpWallet.js";
import { RegistrationForm } from "../ui-components/RegistrationForm";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import { ToastNotification } from "../ui-components/ToastNotification";
import {
  registerIcon,
  newIcon,
  handOutIcon,
  pigIcon,
  browseIcon,
  checkIcon,
  pendingIcon,
} from "../ui-components/Icons.js";
import { PendingOrders } from "../shopEmployee-component/PendingOrders.js";
import { ClientOrder } from "../client-component/ClientOrder";
import GlobalState from '../utility/GlobalState';

import { SVGIcon, Page, PageContainer } from "../ui-components/Page";

function ShopEmployee(props) {

  const [message, setMessage] = useState("");
  const [actionS, setActionS] = useState(0);

  const addMessage = (messageN) => {
    setMessage(messageN);
  };


  const [state, setState] = useContext(GlobalState);

  useEffect(() => {
    setState(state => ({ ...state, useHistoryBack: actionS !== 0 ? () => { setActionS(0) } : false }))
  }, [actionS, setState]);

  return (
    <Page fullscreen>
      <ToastNotification variant='success' onSet={() => { setMessage("") }} message={message} />
      <>
        {
          (actionS === 0) ? (

            <PageContainer>
              <Button
                className='im-button im-button-ticket im-animate '
                onClick={() => {
                  setActionS(1);
                }}>
                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>
                    <SVGIcon icon={registerIcon} width='80px' height='80px' />
                  </Row>
                  <Row className='justify-content-center'>
                    Register client
                  </Row>
                </Col>
              </Button>
              <Button
                className='im-button im-button-ticket im-animate'
                onClick={() => {
                  setActionS(2);
                }}>

                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>
                    <SVGIcon icon={browseIcon} width='80px' height='80px' />
                  </Row>
                  <Row className='justify-content-center'>
                    Browse Products
                  </Row>
                </Col>
              </Button>
              <Button
                className='im-button im-button-ticket im-animate'
                onClick={() => {
                  setActionS(7);
                }}>
                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>
                    <SVGIcon icon={pendingIcon} width='80px' height='80px' />
                  </Row>
                  <Row className='justify-content-center'>

                    Pending orders
                  </Row>
                </Col>
              </Button>
              <Button
                className='im-button im-button-ticket im-animate'
                onClick={() => {
                  setActionS(3);
                }}>
                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>
                    <SVGIcon icon={pigIcon} width='80px' height='80px' />
                  </Row>
                  <Row className='justify-content-center'>

                    TopUp a Wallet
                  </Row>
                </Col>
              </Button>
              <Button
                className='im-button im-button-ticket im-animate '
                onClick={() => {
                  setActionS(4);
                }}>
                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>

                    <SVGIcon icon={newIcon} width='80px' height='80px' />
                  </Row>
                  <Row className='justify-content-center'> New Order </Row>
                </Col>
              </Button>
              <Button
                className='im-button im-button-ticket im-animate '
                onClick={() => {
                  setActionS(5);
                }}>
                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>

                    <SVGIcon icon={handOutIcon} width='80px' height='80px' />

                  </Row>
                  <Row className='justify-content-center'> Hand Out </Row>
                </Col>
              </Button>
              <Button
                className='im-button im-button-ticket im-animate '
                onClick={() => {
                  setActionS(6);
                }}>
                <Col className='justify-content-center'>
                  <Row className='justify-content-center'>
                    <SVGIcon icon={checkIcon} width='80px' height='80px' />  </Row>
                  <Row className='justify-content-center'> Check Orders </Row>
                </Col>
              </Button>
            </PageContainer>
          ) : (<></>)
        }
      </>

      <PageContainer fullscreen>
        {actionS === 1 ? (
          <RegistrationForm
            loggedIn={props.loggedIn}
            changeAction={setActionS}
            addMessage={addMessage}
          />
        ) : null}
        {actionS === 2 ? (
          <BrowserProducts
            changeAction={setActionS}
            addMessage={addMessage}
          />
        ) : null}
        {actionS === 3 ? (
          <>
            
              <TopUpWallet
                changeAction={setActionS}
                addMessage={addMessage}
                className='justify-content-center'
              />
            
          </>
        ) : <></>}

        {actionS === 4 ? (
          <>
            {(props.dow === "Saturday" && props.hour >= 9) ||
              (props.dow === "Sunday" && props.hour <= 23) ? (
              <ClientOrder
                modifyOrder={-1}
                changeAction={setActionS}
                addMessage={addMessage}
                user={props.user}
              />
            ) : (
              "Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00"
            )}
          </>
        ) : <></>}
        {actionS === 7 ? (
          <PendingOrders
            changeAction={setActionS}
            addMessage={addMessage}
          />
        ) : <></>}
        {actionS === 5 ? (
          <>
            {(props.dow === "Wednesday" && props.hour >= 9) ||
              (props.dow === "Friday" && props.hour <= 23) ||
              props.dow === "Thursday" ? (
              <HandOut changeAction={setActionS} addMessage={addMessage} />
            ) : (
              "You can hand out an order from Wednesday at 09:00 to Friday at 18:00"
            )}
          </>
        ) : <></>}
        {actionS === 6 ? (
          <CheckOrders changeAction={setActionS} addMessage={addMessage} />
        ) : <></>}
      </PageContainer>
    </Page>
  );
}

export { ShopEmployee };
