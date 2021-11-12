import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { useState } from "react";
import API from "../API"

function TopUpWallet(props) {
  const [walletId, setWalletId] = useState(null);
  const [walletValue, setWalletValue] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [email,setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSearch = (emailValue) => {
    // wallet Id = API GetWalletByEmail(email)
    //riempi il wallet value
    console.log(emailValue);
  };

  const rechargeWallet = () => {
    //API rechargeWallet(walletId, rechargeAmount)
    API.updateWallet(rechargeAmount,email)
    .catch((e)=> {console.log("Error recharging the wallet " + e)
  setErrorMessage("Error recharging the wallet " + e)})
  };

  return (
    <>
      {" "}
      <Container>
        <Row className='justify-content-center'>
          {" "}
          <h2> TopUp a Client's Wallet </h2>{" "}
        </Row>
        <Row>
          {" "}
          <SearchComponent
            className='mx-auto'
            handleSearch={handleSearch}
          />{" "}
        </Row>

        {walletId ? (
          <>
            {" "}

            <Row className='justify-content-center below'>
              {" "}
              <h2> Your Wallet</h2>{" "}
            </Row>

            {errorMessage ? (
          <Alert variant='danger'> {errorMessage} </Alert>
        ) : (
          ""
        )}
        
            <Form onSubmit={rechargeWallet}>
              <Form.Label> Actual Balance: </Form.Label>
              <Form.Control disabled type='text' value={walletValue} />{" "}
              <Form.Label> Recharge: </Form.Label>
              <Form.Control
                type='text'
                onChange={(ev) => setRechargeAmount(ev.target.value)}
              />{" "}
              <Button type='submit' className='spg-button below'>
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
