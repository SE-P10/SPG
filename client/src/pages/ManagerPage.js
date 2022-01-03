import { Row, Button, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkIcon } from "../ui-components/Icons";
import { SeeStatistics } from "../manager-component/SeeStatistics";
import GlobalState from '../utility/GlobalState';
import { SVGIcon, Page, PageTitle, PageContainer, PageSeparator } from "../ui-components/Page";

function ManagerPage(props) {

  const [actionM, setActionM] = useState(0);

  const [stateM, setStateM] = useContext(GlobalState);

  useEffect(() => {
    setStateM(stateM => ({ ...stateM, useHistoryBack: actionM !== 0 ? () => { setActionM(0) } : false }))
  }, [actionM, setStateM]);

  return (
    <Page>

      {props.user.name ? (
        <>
          <PageSeparator hidden />
          <PageTitle>{props.user.name}</PageTitle>
        </>
      )
        : null}

      {actionM === 0 ? (
        <PageContainer>
          <Button
            className='im-button im-button-ticket im-animate'
            onClick={() => {
              setActionM(1);
            }}>
            <Col className='justify-content-center'>
              <Row className='justify-content-center'>
                <SVGIcon icon={checkIcon} width='80px' height='80px' />
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
        {actionM === 1 ? (
          <>
              <SeeStatistics user={props.user} />
          </>
        ) : null}
      </PageContainer>
    </Page>
  );
}

export { ManagerPage };
