import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userIcon, plantIcon, logOutIcon } from "./Icons";
import "../css/custom.css";
function MyNavbar(props) {
  return (
    <Navbar className='SGP-Navbar' variant='dark'>
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
        <Link to={"/about"} className='ml-2 text-white'>
          {" "}
          About us
        </Link>
      </Nav.Item>
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
    </Navbar>
  );
}

export default MyNavbar;
