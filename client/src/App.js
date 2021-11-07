import { React, useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { LoginForm } from "./pages/Login";
import { ShopEmployee } from "./pages/ShopEmployee";
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
      const user = await API.getUserInfo();
      setLoggedIn(true);
      setUser(user);
      console.log(user.role);
    };
    checkAuth().catch((err) => console.log(err));
  }, []);

  const doLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);

      setUser(user);
      console.log(user.role);

      setMessage({ msg: "Welcome, " + user.name, type: "success" });
    } catch (err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(null);
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
                {loggedIn && user !== null && user.role == 1 ? (
                  <Redirect to='/shopemployee' />
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
            <Container
              fluid
              className='justify-content-center d-flex'></Container>
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
      </Switch>
    </Router>
  );
};

export default App;
