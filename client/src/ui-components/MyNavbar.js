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
            {plantIcon} &nbsp;SolidarityPurchasingGroup
          </Navbar.Brand>{" "}
        </Link>
      </Nav.Item>

      <Nav.Item>
        <Link to={"/"} className='secondColor'>
          {" "}
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/"} className='secondColor'>
          {" "}
          About{" "}
        </Link>
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
              Logout{" "}
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
