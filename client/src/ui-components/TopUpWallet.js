import { Container, Row, Form, Button } from "react-bootstrap";
import { SearchComponent } from "./SearchComponent";
import { useState } from "react";

function TopUpWallet(props) {
  const [walletId, setWalletId] = useState(null);
  const [walletValue, setWalletValue] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState(0);

  const handleSearch = (email) => {
    // wallet Id = API GetWalletByEmail(email)
    //riempi il wallet value
    console.log(email);
  };

  const rechargeWallet = () => {
    //API rechargeWallet(walletId, rechargeAmount)
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
              <h1> Wallet ciao a tutti</h1>{" "}
            </Row>
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
