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

      <Navbar.Toggle aria-controls='responsive-navbar-nav' className='mb-2 ' />
      <Navbar.Collapse id='responsive-navbar-nav '>
        {props.loggedIn ? (
          <>
            <Nav.Item className='ml-auto mr-3 mainColor'>
              <Link to={"/personalpage"} className='text-white'>
                {" "}
                {userIcon}{" "}
              </Link>{" "}
            </Nav.Item>
            <Nav.Item className=' mr-3 mainColor'>
              <Link
                to={"/"}
                className='text-white'
                onClick={() => {
                  props.closeMessage();
                  props.doLogOut();
                }}>
                {logOutIcon}{" "}
              </Link>
            </Nav.Item>
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
  );
}

export default MyNavbar;
