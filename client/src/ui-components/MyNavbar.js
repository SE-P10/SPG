import { Nav, Navbar,   NavDropdown ,  Form,  Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userIcon, plantIcon, logOutIcon } from "./Icons";
import "../css/custom.css";
import Calendar from 'react-calendar'
function MyNavbar(props) {
  const [tmpHour,setTmpHour] = useState(-1)
  const setDayOfWeek = (day) => {
    switch(day) {
      case 0 :
        
        props.changeDow('Sunday');
        break;
      case 1 :
        props.changeDow('Monday');
        break;
      case 2 :
        props.changeDow('Tuesday');
          break;
      case 3 :
        props.changeDow('Wednesday');
          break;
      case 4 :
        props.changeDow('Thursday');
            break;
      case 5 :
        props.changeDow('Friday');
              break;
      case 6 :
        props.changeDow('Saturday');
              break;

            
    }

  }


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
      <NavDropdown title="Select date" id="navbarScrollingDropdown">

      <Nav.Item>
      <Calendar
       minDate={new Date()}
        onClickDay={(value,event) =>
         setDayOfWeek(value.getDay()) }
      />

        </Nav.Item>
        </NavDropdown>
        <NavDropdown title="Select hour" id="navbarScrollingDropdown">
      <Nav.Item> 
      <Form.Control id="1"   size='sm'  placeholder="Set hour"
      onChange={(ev) =>{
        if (!(isNaN(parseInt(ev.target.value))) && !((parseInt(ev.target.value)) > 23 || (parseInt(ev.target.value)) < 0))  {
          setTmpHour((parseInt(ev.target.value)))

        }
      } }/>
      <Button className='spg-button' onClick={() =>{tmpHour !== -1 ? props.changeHour(tmpHour) : console.log(undefined)} }>set</Button>
      </Nav.Item>
      </NavDropdown>

      

      

      

     

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
