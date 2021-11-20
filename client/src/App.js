import { React, useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { LoginForm } from "./pages/Login";
import { ShopEmployee } from "./pages/ShopEmployee";
import { ClientPage } from "./pages/ClientPage";
import { HomePage } from "./pages/HomePage";
import { FarmerPage } from "./pages/FarmerPage";
import { AboutPage } from "./pages/AboutPage";
import { RegistrationForm } from "./ui-components/RegistrationForm";
import { Dimensions } from "react-native";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyNavbar from "./ui-components/MyNavbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import API from "./API";

const App = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    //per non perdere utente loggato se aggiorno pagina, da qui viene l'errore della GET 401(unhautorized)
    const checkAuth = async () => {
      const userTmp = await API.getUserInfo();
      setLoggedIn(true);
      setUser(userTmp);
    };
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

  return (
    <Router>
      <MyNavbar
        doLogOut={doLogOut}
        loggedIn={loggedIn}
        closeMessage={closeMessage}
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
                    {user.role == 1 ? <Redirect to='/shopemployee' /> : null}
                    {user.role == 0 ? <Redirect to='/clientpage' /> : null}
                    {user.role == 2 ? <Redirect to='/farmerpage' /> : null}
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
            <Container fluid className='justify-content-center d-flex w-100'>
              <HomePage className='w-100' />
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
                    {user.role == 1 ? <Redirect to='/shopemployee' /> : null}
                    {user.role == 0 ? <Redirect to='/clientpage' /> : null}
                    {user.role == 2 ? <Redirect to='/farmerpage' /> : null}
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
            <Container fluid className='justify-content-center d-flex'>
              {/* inserire controllo loggedIn e ruolo*/}{" "}
              <ShopEmployee user={user} />
            </Container>
          )}
        />
        <Route
          exact
          path='/signup'
          render={() => (
            <Container fluid className='justify-content-center d-flex w-100'>
              <RegistrationForm className='below' />
            </Container>
          )}
        />

        <Route
          exact
          path='/farmerpage'
          render={() => (
            <Container fluid className='justify-content-center d-flex'>
              {/* inserire controllo loggedIn e ruolo*/}{" "}
              <FarmerPage user={user} />
            </Container>
          )}
        />

        <Route
          exact
          path='/clientpage'
          render={() => (
            <Container fluid className='justify-content-center d-flex'>
              {/* inserire controllo loggedIn e ruolo*/}{" "}
              <ClientPage user={user} />
            </Container>
          )}
        />

        <Route
          exact
          path='/about'
          render={() => (
            <Container fluid className='justify-content-center d-flex'>
              {/* inserire controllo loggedIn e ruolo*/}{" "}
              <AboutPage user={user} />
            </Container>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
