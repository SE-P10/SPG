import { React, useState } from "react";
import { Nav, Navbar, NavDropdown, Modal, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userIcon, plantIcon, logOutIcon } from "./Icons";
import "../css/custom.css";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import API from "../API";
import dayjs from "dayjs";

function MyNavbar(props) {

  let virtualTime = props.virtualTimeDate || dayjs();

  const [showVCModal, setShowVCModal] = useState(props.showVCModal || false);

  return (
    <>
      <Navbar collapseOnSelect expand='sm' className='SGP-Navbar' variant='dark'>
        <Nav.Item>
          <Link to={"/"}>
            {" "}
            <Navbar.Brand className='mainColor'>
              {" "}
              {plantIcon} &nbsp;SPG
            </Navbar.Brand>{" "}
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={"/about"} className='text-white'>
            {" "}
            About us
          </Link>
        </Nav.Item>

        {
          props.loggedIn ? (
            <>
              <Modal show={showVCModal} onHide={() => setShowVCModal(false)} className="virtualClockModal">
                <Modal.Header closeButton>
                  <Modal.Title>Virtual Clock</Modal.Title>
                </Modal.Header>
                <Modal.Body align="center">

                  <input id="setHour" style={{ width: "100%", padding: "2px 17px" }} placeholder="Set hour" type="time" onChange={async (e) => {

                    let value = e.target.value;

                    if (/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value)) {

                      let comps = value.split(':');
                      let newTimedate = virtualTime.set('hour', comps[0]).set('minute', comps[1]);

                      props.changeTimeDate(await API.setTime(newTimedate.toDate()))
                    }

                  }} value={virtualTime.format("HH:mm")} />

                  <br /> <br />

                  <Calendar
                    minDate={new Date()}
                    onClickDay={async (value, event) => {

                      let newDate = dayjs(value);

                      let newTimeDate = virtualTime.set('year', newDate.year()).set('month', newDate.month()).set('date', newDate.date());

                      props.changeTimeDate(await API.setTime(newTimeDate.toDate()))
                    }}
                    value={virtualTime.toDate()}
                  />
                </Modal.Body>
              </Modal>
            </>
          ) : <></>
        }

        <Navbar.Toggle aria-controls='responsive-navbar-nav' className='mb-2' />
        <Navbar.Collapse id='responsive-navbar-nav SGP-Navbar'>
          {props.loggedIn ? (
            <>
              <NavDropdown
                title={userIcon}
                id='navbarScrollingDropdown'
                className='ml-auto mr-5 text-black'>
                <NavDropdown.Item>
                  {" "}
                  <Link to={"/personalpage"} className='text-black'>
                    {" "}
                    {userIcon}{" "}
                  </Link>{" "}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to={"/"}
                    className='text-black'
                    onClick={() => {
                      props.closeMessage();
                      props.doLogOut();
                    }}>
                    {logOutIcon}{" "}
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <Nav.Item className='ml-auto mr-3 mainColor'>
                <Link className='mainColor' to='login'>
                  Login{" "}
                </Link>
              </Nav.Item>
              <Nav.Item className=' mr-3 mainColor'>
                <Link className='mainColor' to='signup'>
                  Sign up{" "}
                </Link>
              </Nav.Item>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      {
        props.loggedIn ? (
          <Card>
            <Card.Body align='center' style={{ padding: "8px" }}> {virtualTime.format("DD-MM-YYYY HH:mm:ss")}
              <>&nbsp;</>
              <Button variant="outline-danger" onClick={() => setShowVCModal(true)}>
                set
              </Button></Card.Body>
          </Card>
        ) : <></>
      }
    </>
  );
}

export default MyNavbar;
