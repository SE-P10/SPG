import { Nav, Navbar, NavDropdown ,  Form, ButtonGroup, Dropdown,  DropdownButton} from "react-bootstrap";
import { Link } from "react-router-dom";
import { userIcon, plantIcon, logOutIcon } from "./Icons";
import "../css/custom.css";
function MyNavbar(props) {
  return (
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
      <Nav.Item>
        
      {" "}<Form.Control id="1"   size='sm'  placeholder="Set hour"
      
      onChange={(ev) =>{
        if (!(isNaN(parseInt(ev.target.value))) && !((parseInt(ev.target.value)) > 23 || (parseInt(ev.target.value)) < 0))  {
          props.changeHour((parseInt(ev.target.value)))

        }
        

      } }/>
       

      </Nav.Item>

      <Nav.Item>
      <div>
    {[DropdownButton].map((DropdownType, idx) => (
      <DropdownType
        as={ButtonGroup}
        key="1"
        id="1"
        size="sm"
        variant="light"
        title="Chose Day"
      >
        <Dropdown.Item onClick={ () => {props.changeDow('Monday')}} >Mon</Dropdown.Item>
        <Dropdown.Item onClick={ () => {props.changeDow('Tuesday')}}>Tue</Dropdown.Item>
        <Dropdown.Item onClick={ () => {props.changeDow('Wednesday')}}>Wed</Dropdown.Item>
        <Dropdown.Item onClick={ () => {props.changeDow('Thursday')}}>Thu</Dropdown.Item>
        <Dropdown.Item onClick={ () => {props.changeDow('Friday')}}>Fri</Dropdown.Item>
        <Dropdown.Item onClick={ () => {props.changeDow('Saturday')}}>Sat</Dropdown.Item>
        <Dropdown.Item onClick={ () => {props.changeDow('Sunday')}}>Sun</Dropdown.Item>
      </DropdownType>
    ))}
  </div>

        </Nav.Item>

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
  );
}

export default MyNavbar;
