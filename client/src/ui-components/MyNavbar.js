import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userIcon, plantIcon, logOutIcon } from "./Icons";
import "../css/custom.css";
function MyNavbar(props) {
  return (
    <Navbar className='SGP-Navbar block' variant='dark'>
      <Nav.Item>
        <Link to={"/"}>
          {" "}
          <Navbar.Brand className='mainColor'>
            {" "}
            {plantIcon} &nbsp;SolidarityPurchasingGroup
          </Navbar.Brand>{" "}
        </Link>
      </Nav.Item>

      <Nav.Item>
        {props.loggedIn ? (
          <Link to={"/personalpage"} className='secondColor'>
            {" "}
            Personal Page
          </Link>
        ) : null}
      </Nav.Item>

      {props.loggedIn ? (
        <>
          <Nav.Item className='ml-auto mr-3 text-white'>
            <Link
              to={"/"}
              className='mainColor'
              onClick={() => {
                props.closeMessage();
                props.doLogOut();
              }}>
              {logOutIcon}Logout{" "}
            </Link>
          </Nav.Item>{" "}
        </>
      ) : (
        <Nav.Item className='ml-auto mr-3 mainColor'>
          <Link className='mainColor' to='login'>
            {userIcon} Login{" "}
          </Link>
        </Nav.Item>
      )}
    </Navbar>
  );
}

export default MyNavbar;
