import { Row, Button, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { deliveryIcon } from "../ui-components/Icons";
import { SeeStatistics } from "../manager-component/SeeStatistics";
import GlobalState from '../utility/GlobalState';
import { SVGIcon, Page, PageTitle, PageContainer, PageSeparator } from "../ui-components/Page";

function ManagerPage(props) {

  const [actionC, setActionC] = useState(0);

  const [state, setState] = useContext(GlobalState);

  useEffect(() => {
    setState(state => ({ ...state, useHistoryBack: actionC !== 0 ? () => { setActionC(0) } : false }))
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
                See Statistics
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
              <SeeStatistics user={props.user} />
          </>
        ) : null}
      </PageContainer>
    </Page>
  );
}

export { ManagerPage };
