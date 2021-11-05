import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userIcon, plantIcon } from "./Icons";
import "../css/custom.css";
function MyNavbar(props) {
  return (
    <Navbar className='SGP-Navbar' variant='dark'>
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
        <Nav.Item className='ml-auto mr-3 text-white'>
          <Link to={"/"}>
            <Button
              onClick={() => {
                props.closeMessage();
                props.doLogOut();
              }}>
              Logout
            </Button>{" "}
          </Link>
        </Nav.Item>
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
