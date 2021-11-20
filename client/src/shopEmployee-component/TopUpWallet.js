import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { SearchComponent } from "../ui-components/SearchComponent";
import { useState } from "react";
import API from "../API";
import "../css/custom.css";

function TopUpWallet(props) {
  const [walletValue, setWalletValue] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [email, setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (emailValue) => {
    console.log("valore email " + emailValue);
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
  };

  const rechargeWallet = () => {
    if (rechargeAmount === 0 || rechargeAmount < 0 || rechargeAmount === null) {
      setErrorMessage("The amount must be greater than 0.");
    } else {
      API.updateWallet(rechargeAmount, email).catch((e) => {
        console.log("Error recharging the wallet. " + e);
        setErrorMessage("Error recharging the wallet. " + e);
      });
      props.addMessage("successfully recharged your wallet");
      props.changeAction(0);
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
                  if ((parseInt(ev.target.value)) < 0) setErrorMessage("negative number")
                  else setRechargeAmount(ev.target.value)}}
              />{" "}
              <Button onClick={rechargeWallet} className='spg-button below'>
                {" "}
                Recharge the wallet
              </Button>
            </Form>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
export { TopUpWallet };
