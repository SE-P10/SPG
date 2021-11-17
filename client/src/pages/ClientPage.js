import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "../css/custom.css";
import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import { HandOut } from "../ui-components/HandOut.js";
import { CheckOrders } from "../ui-components/CheckOrders";
import { NewOrder } from "../ui-components/NewOrder";
import { TopUpWallet } from "../ui-components/TopUpWallet.js";
import { RegistrationForm } from "../ui-components/RegistrationForm";
import { BrowserProducts } from "../ui-components/BrowseProducts";
import "../css/custom.css";



function ClientPage(props) {
  const [message, setMessage] = useState("");
  const [action, setAction] = useState(0);
  const changeAction = (actionN) => {
    setAction(actionN);
  };

  const addMessage = (messageN) => {
    setMessage(messageN);
  };
  /* Actions 
    0 = No actions (Home)
    1 = Register New client 
    2 = Browser Product 
    3 = TopUp a Wallet
    4 = New Order 
    5 = HandOut
    6 = Check Orders */






  return <>ClientPage </>;
}

export { ClientPage };
