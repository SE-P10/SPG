import { React, useState, useEffect } from "react";
import { Nav, Navbar, Container, Modal, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userIcon, plantIcon, logOutIcon } from "./Icons";
import "../css/custom.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import API from "../API";
import dayjs from "dayjs";

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

  return (
    <>
      <Navbar
        collapseOnSelect
        expand='sm'
        className='SGP-Navbar'
        variant='dark'>

        <Container fluid className='justify-content-center d-flex w-100' style={{maxWidth: "1280px"}}>

          <Nav.Item>
            <Link to={"/"}>
              {" "}
              <Navbar.Brand className='mainColor'>
                {" "}
                {plantIcon} &nbsp;SPG
              </Navbar.Brand>{" "}
            </Link>
          </Nav.Item>

          {props.loggedIn ? (
            <>
              <Modal
                show={showVCModal}
                onHide={() => setShowVCModal(false)}
                className='virtualClockModal'>
                <Modal.Header closeButton>
                  <Modal.Title>Virtual Clock</Modal.Title>
                </Modal.Header>
                <Modal.Body align='center'>
                  <input
                    id='setHour'
                    style={{ width: "100%", padding: "2px 17px" }}
                    placeholder='Set hour'
                    type='time'
                    onChange={async (e) => {
                      let value = e.target.value;

                      if (
                        /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
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
                  <br /> <br />
                  <Calendar
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
                </Modal.Body>
                <Button variant="outline-danger"
                  onClick={async () => {

                    let timeoffset = await API.setTime(getVirtualTimeTMP().toDate());

                    setVirtualTime(getVirtualTimeTMP());

                    props.changeTimeDate(timeoffset);

                    setShowVCModal(false)
                  }}>
                  SET
                </Button>
              </Modal>
            </>
          ) : (
            <></>
          )}

          <Navbar.Toggle aria-controls='responsive-navbar-nav' className='mb-2' />
          <Navbar.Collapse id='responsive-navbar-nav '>
            {props.loggedIn ? (
              <>
                <Container className='ml-auto'>
                  <Nav.Item className='ml-auto mr-3 mainColor'>
                    {" "}
                    <Link to={"/login"} className='text-white'>
                      {" "}
                      {userIcon}{" "}
                    </Link>{" "}
                  </Nav.Item>
                  <Link
                    to={"/"}
                    className='text-white'
                    onClick={() => {
                      props.closeMessage();
                      props.doLogOut();
                    }}>
                    {logOutIcon}{" "}
                  </Link>
                </Container>
              </>
            ) : (
              <>
                {" "}
                <Container className='ml-auto'>
                  <Nav.Item className='ml-auto mainColor'>
                    <Link className='mainColor' to='login'>
                      Login &nbsp;{" "}
                    </Link>
                  </Nav.Item>
                  <Nav.Item className=' mainColor'>
                    <Link className='mainColor' to='signup'>
                      Sign up{" "}
                    </Link>
                  </Nav.Item>
                </Container>
              </>
            )}
          </Navbar.Collapse>
        </Container>

      </Navbar>
      {props.loggedIn ? (
        <Card>
          <Card.Body align='center' style={{ padding: "8px" }}>
            {" "}
            {virtualTime.format("DD-MM-YYYY HH:mm:ss")}
            <>&nbsp;</>
            <Button
              variant='outline-danger'
              onClick={() => setShowVCModal(true)}>
              set
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyNavbar;
