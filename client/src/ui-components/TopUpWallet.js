import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { useState } from "react";
import API from "../API"

function TopUpWallet(props) {

  const [walletValue, setWalletValue] = useState(null);
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [email,setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSearch = (emailValue) => {
    setEmail(()=>emailValue)
    API.getWalletByMail(emailValue)
    .then((walletValue)=>{setWalletValue(walletValue)})
    .catch((e)=>{console.log("Error searching the wallet. "+e)
    setErrorMessage("Error searching the wallet. " + e)});
  };

  const rechargeWallet = () => {

    if(rechargeAmount === 0){
      setErrorMessage("Select the Amount")
    }
    else{
    API.updateWallet(rechargeAmount,email)
    .catch((e)=> {console.log("Error recharging the wallet. " + e)
  setErrorMessage("Error recharging the wallet. " + e)})
   props.addMessage("successfully recharged your wallet")
   props.changeAction(0);
    }
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

        {walletValue ? (
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
                defaultValue={0}
                type='number'
                onChange={(ev) => setRechargeAmount(ev.target.value)}
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
