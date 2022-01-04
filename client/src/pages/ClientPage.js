import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { ClientOrder } from "../client-component/ClientOrder";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import { YourOrders } from "../client-component/YourOrders";
import {
  newIcon,
  browseIcon,
  checkIcon,
  mailIcon,
} from "../ui-components/Icons.js";
import { ClientNotifications } from "../client-component/ClientNotifications";
import { SVGIcon, Page, PageTitle, PageContainer, PageSeparator } from "../ui-components/Page";
import { ToastProvider } from 'react-toast-notifications';
import { ToastNotification } from "../ui-components/ToastNotification";
import GlobalState from '../utility/GlobalState';
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
    });
  }, [actionC]);

  const modifyOrderFunc = (orderId) => {
    setModifyOrder(orderId);
    setActionC(2);
  };

  const addMessage = (messageN) => {
    setMessage(messageN);
  };

  const [state, setState] = useContext(GlobalState);

  useEffect(() => {
    setState(state => ({ ...state, useHistoryBack: actionC !== 0 ? () => { setActionC(0) } : false }))
  }, [actionC, setState]);

  return (
    <Page>
      <ToastProvider>
      <ToastNotification variant='success' onSet={() => { setMessage("") }} message={message} />
      </ToastProvider>
      {
        props.user.name ? (<>
          <PageSeparator hidden />
          <PageTitle>{props.user.name} personal page</PageTitle>
        </>
        ) : null
      }

      {actionC === 0 ? (

        <PageContainer>
          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionC(1);
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
              setActionC(2);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={newIcon} width='80px' height='80px' />
              </Row>
              <Row className='justify-content-center'>
                New Order
              </Row>
            </Col>
          </Button>

          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionC(3);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={checkIcon} width='80px' height='80px' />
              </Row>
              <Row className='justify-content-center'>
                Your Orders
              </Row>
            </Col>
          </Button>

          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionC(4);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={mailIcon} width='80px' height='80px' />
              </Row>
              <Row className='justify-content-center'>
                Personal MailBox
              </Row>
            </Col>
          </Button>

        </PageContainer>

      ) : <></>}

      <PageContainer >
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
      </PageContainer>
    </Page>
  );
}

export { ClientPage };
