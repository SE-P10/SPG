import { React, useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { LoginForm } from "./pages/Login";
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

  const doLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setUser(user);
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
                {loggedIn ? (
                  <Redirect to='/' />
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
      </Switch>
    </Router>
  );
};

export default App;
