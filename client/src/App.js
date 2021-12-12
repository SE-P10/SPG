import { React, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { LoginForm } from "./pages/Login";
import { ShopEmployee } from "./pages/ShopEmployeePage";
import { ClientPage } from "./pages/ClientPage";
import { HomePage } from "./pages/HomePage";
import { FarmerPage } from "./pages/FarmerPage";
import { AboutPage } from "./pages/AboutPage";
import { RegistrationForm } from "./ui-components/RegistrationForm";
import dayjs from "dayjs";
import { WarehousePage } from "./pages/WarehousePage";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyNavbar from "./ui-components/MyNavbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import "./css/custom.css";
import API from "./API";
import { BrowserProducts } from "./ui-components/BrowseProducts";

const App = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [virtualTimeDate, setVirtualTimeDate] = useState(dayjs());
  const [timeDateOffset, setTimeDateOffset] = useState(0);

  useEffect(() => {
    //per non perdere utente loggato se aggiorno pagina, da qui viene l'errore della GET 401(unhautorized)
    const checkAuth = async () => {
      const userTmp = await API.getUserInfo();
      setLoggedIn(true);
      console.log(userTmp);
      setUser(userTmp);
    };
    //fare api per prendere orario
    checkAuth().catch((err) => console.log(err));
  }, []);

  const doLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user);
      setMessage({ msg: "Welcome ", type: "success" });
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(null);
    setMessage("");
  };

  const closeMessage = () => {
    setMessage("");
  };

  /**
   * Handle VirtualTime updates
   */
  useEffect(() => {
    let loaded = false;

    async function timeHandler() {
      if (!loaded) {
        loaded = true;
        setTimeDateOffset(await API.getTime(true));
      }

      // prevent pooling the server
      let timeoffset = timeDateOffset || 0;

      setVirtualTimeDate(dayjs().add(timeoffset, "second"));
    }

    timeHandler();

    const interval = setInterval(timeHandler, 1000);

    return () => clearInterval(interval);
  }, [timeDateOffset]);

  return (
    <Router>
      <MyNavbar
        doLogOut={doLogOut}
        loggedIn={loggedIn}
        closeMessage={closeMessage}
        changeTimeDate={setTimeDateOffset}
        virtualTimeDate={virtualTimeDate}
      />

      <Switch>
        <Route
          exact
          path='/login'
          render={() => (
            <Container fluid className='justify-content-center d-flex'>
              <Row className='vh-100vh mt-10'>
                {loggedIn && user !== null ? (
                  <>
                    {" "}
                    {user.role === "1" ? <Redirect to='/shopemployee' /> : null}
                    {user.role === "0" ? <Redirect to='/clientpage' /> : null}
                    {user.role === "2" ? <Redirect to='/farmerpage' /> : null}
                    {user.role === "3" ? <Redirect to='/warehouse' /> : null}
                  </>
                ) : (
                  <LoginForm
                    closeMessage={closeMessage}
                    message={message}
                    login={doLogin}
                  />
                )}
              </Row>
            </Container>
          )}
        />

        <Route
          exact
          path='/'
          render={() => (
            <>
              <Container fluid className='justify-content-center d-flex w-100'>
                <HomePage className='w-100' />
              </Container>
            </>
          )}
        />

        <Route
          exact
          path='/products'
          render={() => (
            <Container fluid className='justify-content-center d-flex w-100'>
              <BrowserProducts />
            </Container>
          )}
        />

        <Route
          exact
          path='/personalpage'
          render={() => (
            <Container fluid className='justify-content-center d-flex'>
              <Row className='vh-100vh mt-10'>
                {loggedIn && user !== null ? (
                  <>
                    {" "}
                    {user.role === "1" ? <Redirect to='/shopemployee' /> : null}
                    {user.role === "0" ? <Redirect to='/clientpage' /> : null}
                    {user.role === "2" ? <Redirect to='/farmerpage' /> : null}
                    {user.role === "3" ? <Redirect to='/warehouse' /> : null}
                  </>
                ) : (
                  <LoginForm
                    closeMessage={closeMessage}
                    message={message}
                    login={doLogin}
                  />
                )}
              </Row>
            </Container>
          )}
        />

        <Route
          exact
          path='/shopemployee'
          render={() => (
            <>
              {user !== null && user.role === "1" ? (
                <Container fluid className='justify-content-center d-flex'>
                  {/* inserire controllo loggedIn e ruolo*/}{" "}
                  <ShopEmployee
                    hour={virtualTimeDate.format("H")}
                    dow={virtualTimeDate.format("dddd")}
                    user={user}
                    loggedIn={loggedIn}
                  />
                </Container>
              ) : (
                <Redirect to='/login' />
              )}
            </>
          )}
        />
        <Route
          exact
          path='/warehouse'
          render={() => (
            <>
              {user !== null && user.role === "3" ? (
                <Container fluid className='justify-content-center d-flex'>
                  <WarehousePage user={user}  hour={virtualTimeDate.format("H")} dow={virtualTimeDate.format("dddd")} />
                </Container>
              ) : (
                <Redirect to='/login' />
              )}
            </>
          )}
        />
        <Route
          exact
          path='/signup'
          render={() => (
            <Container fluid className='justify-content-center d-flex w-100'>
              <RegistrationForm
                className='below'
                loggedIn={loggedIn}
                doLogin={doLogin}
              />
            </Container>
          )}
        />

        <Route
          exact
          path='/farmerpage'
          render={() => (
            <>
              {user !== null && user.role === "2" ? (
                <Container fluid className='justify-content-center d-flex'>
                  {/* inserire controllo loggedIn e ruolo*/}{" "}
                  <FarmerPage
                    hour={virtualTimeDate.format("H")}
                    dow={virtualTimeDate.format("dddd")}
                    user={user}
                  />
                </Container>
              ) : (
                <Redirect to='/login' />
              )}
            </>
          )}
        />

        <Route
          exact
          path='/clientpage'
          render={() => (
            <>
              {" "}
              {user !== null && user.role === "0" ? (
                <Container fluid className='justify-content-center d-flex'>
                  {/* inserire controllo loggedIn e ruolo*/}{" "}
                  <ClientPage
                    virtualTimeDate={virtualTimeDate}
                    hour={virtualTimeDate.format("H")}
                    dow={virtualTimeDate.format("dddd")}
                    user={user}
                  />
                </Container>
              ) : (
                <Redirect to='/login' />
              )}
            </>
          )}
        />

        <Route
          exact
          path='/about'
          render={() => (
            <>
              <Container fluid className='justify-content-center d-flex'>
                {/* inserire controllo loggedIn e ruolo*/}{" "}
                <AboutPage user={user} />
              </Container>
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
