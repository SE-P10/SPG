import { Container, Row, Form, Button, Alert, Spinner } from "react-bootstrap";
import { SearchComponent } from "../ui-components/SearchComponent";
import { useState } from "react";
import API from "../API";
import "../css/custom.css";

function TopUpWallet(props) {
  const [walletValue, setWalletValue] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [email, setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWalletLoading, setIsWalletLoading] = useState(true);
  const handleSearch = (emailValue) => {

    if (!emailValue) setErrorMessage("You have to insert an email!");
    else {
      setEmail(() => emailValue);
      API.getWalletByMail(emailValue)
        .then((walletValueN) => {
          setErrorMessage("");
          setWalletValue(walletValueN);
        })
        .catch((e) => {
          setErrorMessage("No user found.");
          setWalletValue(null);
        });
    }
  };

  const rechargeWallet = () => {
    let operationOk = true;
    if (rechargeAmount === null  || rechargeAmount == 0 || rechargeAmount < 0 ) {
       operationOk = false;
    } 
    
    if (operationOk) {
      API.updateWallet(rechargeAmount, email).catch((e) => {
        console.log("Error recharging the wallet. " + e);
        setErrorMessage("Error recharging the wallet. " + e);
        
      });
      props.addMessage("successfully recharged your wallet");
      props.changeAction(0);
      
    }
    else {
      setErrorMessage("Wrong quantity")
    }
  };

  return (
    <>
      {" "}
      <Container className='cont'>
        <Row className='justify-content-center'>
          {" "}
          <h2> TopUp a Client's Wallet </h2>{" "}
        </Row>
        <Row>
          {errorMessage ? (
            <Alert
              variant='danger'
              className='mx-auto'
              onClose={() => setErrorMessage("")}
              dismissible>
              {" "}
              {errorMessage}{" "}
            </Alert>
          ) : (
            ""
          )}{" "}
          <SearchComponent className='mx-auto' handleSearch={handleSearch} />{" "}
        </Row>

        {walletValue ? (
          <>
            {" "}
            {isWalletLoading ? (
              <>
                {" "}
                <Row className='justify-content-center below'>
                  {" "}
                  <h2> Your Wallet</h2>{" "}
                </Row>
                <Form onSubmit={rechargeWallet}>
                  <Form.Label> Actual Balance: </Form.Label>
                  <Form.Control disabled type='text' value={walletValue} />{" "}
                  <Form.Label> Recharge: </Form.Label>
                  <Form.Control
                    defaultValue={0}
                    min={0}
                    type='number'
                    onChange={(ev) => {
                      if ( isNaN(parseInt(ev.target.value)) ||  parseInt(ev.target.value) <= 0)
                        {setErrorMessage("wrong amount");setRechargeAmount(-1);}
                      else setRechargeAmount(ev.target.value);
                    }}
                  />{" "}
                  <Button onClick={rechargeWallet} className='spg-button over below'>
                    {" "}
                    Recharge the wallet
                  </Button>
                </Form>
              </>
            ) : (
              <Container>
                <Spinner animation='border' variant='success'></Spinner>
              </Container>
            )}{" "}
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
export { TopUpWallet };
