import { React, useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { LoginForm } from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MyNavbar from "./MyNavbar";

import ErrorToast from "./components/ErrorToast";

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
      setCounterId(user.counter_id);
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
    </Router>
  );
};

export default App;
