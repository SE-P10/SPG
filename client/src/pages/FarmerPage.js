import { Button, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import { updateIcon, confirmIcon } from "../ui-components/Icons";
import { UpdateAvailability } from "../farmer-component/UpdateAvailability";
import { ConfirmProducts } from "../farmer-component/ConfirmProducts";
import { SVGIcon, Page, PageTitle, PageContainer, PageSeparator } from "../ui-components/Page";
import { ToastNotification } from "../ui-components/ToastNotification";
import GlobalState from '../utility/GlobalState';

function FarmerPage(props) {
  const [message, setMessage] = useState("");
  const [actionF, setActionF] = useState(0);
  const changeAction = (actionN) => {
    setActionF(actionN);
  };

  const addMessage = (messageNew) => {
    setMessage(messageNew);
  };

  const [state, setState] = useContext(GlobalState);

  useEffect(() => {
    setState(state => ({ ...state, useHistoryBack: actionF !== 0 ? () => { setActionF(0) } : false }))
  }, [setState, actionF]);

  return (
    <Page>
      <ToastNotification variant='success' onSet={() => { setMessage("") }} message={message} />
      {
        props.user.name ? (
          <>
          <PageSeparator hidden/>
          <PageTitle>{props.user.name} farmer personal page</PageTitle>
          </>
        ) : null
      }
 
      {actionF === 0 ? (
        <PageContainer >
          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionF(1);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={updateIcon} width='80px' height='80px' /></Row>
              <Row className='justify-content-center'>

                Update Products Availability
              </Row>
            </Col>
          </Button>

          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionF(2);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={confirmIcon} width='80px' height='80px' /></Row>
              <Row className='justify-content-center'>

                Confirm Products
              </Row>
            </Col>
          </Button>
        </PageContainer>
      ) : (
        ""
      )}

      <PageContainer>
        {actionF === 1 ? (
          <>
            {(props.dow === "Wednesday" && props.hour >= 9) ||
            props.dow === "Thursday" ||
            props.dow === "Friday"  ||
              (props.dow === "Saturday" && props.hour < 9) ? (
              <UpdateAvailability
                changeAction={changeAction}
                addMessage={addMessage}
                user={props.user}
              />
            ) : (
              "You can Update Availability from Wednesday at 09:00 to Saturday at 08:59"
            )}
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
              "You can Confirm Product between Sunday at 23:00 and Monday at 08:59"
            )}
          </>
        ) : null}
      </PageContainer>
    </Page>
  );
}

export { FarmerPage };
