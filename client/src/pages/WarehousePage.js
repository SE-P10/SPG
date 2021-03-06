import { Row, Button, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { deliveryIcon } from "../ui-components/Icons";
import { ManageDelivery } from "../warehouse-component/ManageDelivery";
import GlobalState from '../utility/GlobalState';
import { SVGIcon, Page, PageTitle, PageContainer, PageSeparator } from "../ui-components/Page";

function WarehousePage(props) {

  const [actionC, setActionC] = useState(0);

  const [, setState] = useContext(GlobalState);

  useEffect(() => {
    setState(oldState => ({ ...oldState, useHistoryBack: actionC !== 0 ? () => { setActionC(0) } : false }))
  }, [actionC, setState]);

  return (
    <Page>

      {props.user.name ? (
        <>
          <PageSeparator hidden />
          <PageTitle>{props.user.name}</PageTitle>
        </>
      )
        : null}

      {actionC === 0 ? (
        <PageContainer>
          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionC(1);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={deliveryIcon} width='80px' height='80px' />
              </Row>
              <Row className='justify-content-center'>
                Manage Deliveries
              </Row>
            </Col>
          </Button>
        </PageContainer>
      ) : (
        <></>
      )}
      <PageContainer>
        {actionC === 1 ? (
          <>
            {(props.dow === "Monday" && props.hour >= 9) ||
              (props.dow === "Tuesday" && props.hour < 18) ? (
              <ManageDelivery user={props.user} />
            ) : (
              "You can ack arrivals from Monday at 09:00 to Tuesday at 17:59"
            )}
          </>
        ) : null}
      </PageContainer>
    </Page>
  );
}

export { WarehousePage };
