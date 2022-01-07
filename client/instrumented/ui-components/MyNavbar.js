import { React, useState, useEffect, useContext } from "react";
import { Nav, Navbar, Container, Modal, Button } from "react-bootstrap";
import { userIcon, plantIcon, logOutIcon, backIcon } from "./Icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import GlobalState from '../utility/GlobalState';

import API from "../API";
import dayjs from "dayjs";
import { SVGIcon } from "./Page";

function MyNavbar(props) {

  const [virtualTime, setVirtualTime] = useState(props.virtualTimeDate || dayjs());
  const [virtualTimeTMP, setVirtualTimeTMP] = useState(null);

  useEffect(() => {

    setVirtualTime(props.virtualTimeDate);

  }, [props.virtualTimeDate]);

  const getVirtualTimeTMP = () => {
    return virtualTimeTMP || virtualTime || dayjs();
  }

  const [showVCModal, setShowVCModal] = useState(props.showVCModal || false);

  const [state] = useContext(GlobalState);

  return (
    <>
      <div className="im-spgNavbarWraper">
        <Navbar
          collapseOnSelect
          expand='sm'
          className='im-spgNavbar'>

          <Container fluid className='w-100' style={{ maxWidth: "1280px" }}>

            <Nav.Link href="/">
              <Navbar.Brand className='mainColor'>
                <SVGIcon width='30px' height='30px' icon={plantIcon} />SPG
              </Navbar.Brand>
            </Nav.Link>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" className='mb-2' />
            <Navbar.Collapse id="responsive-navbar-nav" className="flex-grow-0">
              <Nav>
                {props.loggedIn ? (<>
                  <Nav.Link href="/login" className="mainColor"> <SVGIcon width='30px' height='30px' icon={userIcon} /></Nav.Link>
                  <Nav.Link href="/" onClick={() => {
                    props.closeMessage();
                    props.doLogOut();
                  }} className="mainColor">
                    <SVGIcon width='30px' height='30px' icon={logOutIcon} />
                  </Nav.Link>
                </>) : (
                  <>
                    <Nav.Link href="/login" className="mainColor"> Login </Nav.Link>
                    <Nav.Link href="/signup" className="mainColor"> Sign up </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {
          props.loggedIn || state.useHistoryBack ? (
            <div className="im-subNavbar">
              {
                state.useHistoryBack ? (
                  <Button
                    className='im-button im-animate im-historyBackButton'
                    onClick={() => {
                      if (typeof state.useHistoryBack === 'function')
                        state.useHistoryBack()
                    }}>
                    {backIcon}
                  </Button>
                ) : (<></>)
              }
              {
                props.loggedIn ? (<>
                  <Modal
                    show={showVCModal}
                    onHide={() => setShowVCModal(false)}
                    className='virtualClockModal im-modal'>
                    <Modal.Header closeButton>
                      <Modal.Title>Virtual Clock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body align='center' className="im-modal__content">
                      <Container fluid >
                        <input
                          id='setHour'
                          className="im-input"
                          style={{ width: "100%", padding: "2px 17px" }}
                          placeholder='Set hour'
                          type='time'
                          onChange={async (e) => {
                            let value = e.target.value;

                            if (
                              /^([0-1]?\d|2[0-4]):([0-5]\d)(:[0-5]\d)?$/.test(
                                value
                              )
                            ) {
                              let comps = value.split(":");
                              setVirtualTimeTMP(getVirtualTimeTMP()
                                .set("hour", comps[0])
                                .set("minute", comps[1]));
                            }
                          }}
                          value={getVirtualTimeTMP().format("HH:mm")}
                        />
                        <br />
                        <Calendar className={"im-calendar light-shadow"}
                          minDate={virtualTime.toDate()}
                          onClickDay={async (value, event) => {
                            let newDate = dayjs(value);

                            setVirtualTimeTMP(getVirtualTimeTMP()
                              .set("year", newDate.year())
                              .set("month", newDate.month())
                              .set("date", newDate.date())
                            );

                          }}
                          value={getVirtualTimeTMP().toDate()}
                        />
                        <br />
                        <Container className="d-flex w-100 justify-content-center">
                          <Button variant="danger" 
                            onClick={async () => {

                              let timeoffset = await API.setTime(getVirtualTimeTMP().toDate());

                              setVirtualTime(getVirtualTimeTMP());

                              props.changeTimeDate(timeoffset);

                              setShowVCModal(false)
                            }}>
                            SET
                          </Button>
                        </Container>
                      </Container>
                    </Modal.Body>
                  </Modal>
                  <div >
                    {virtualTime.format("DD-MM-YYYY HH:mm:ss")}
                    <>&nbsp;</>
                    <Button 
                      variant='danger'
                      onClick={() => setShowVCModal(true)}>
                      set
                    </Button>
                  </div>
                </>
                )
                  : <></>
              }
            </div>
          ) : (
            <></>
          )
        }
      </div>
      <div style={{ with: "100%", height: "115px" }} />
    </>
  );
}

export default MyNavbar;
