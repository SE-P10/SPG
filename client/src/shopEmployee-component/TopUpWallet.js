import { Container, Row, Form, Button, Spinner } from "react-bootstrap";
import { SearchComponent } from "../ui-components/SearchComponent";
import { useState } from "react";
import API from "../API";
import { BlockTitle, PageSection } from "../ui-components/Page";
import { ToastNotification } from "../ui-components/ToastNotification";


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
          setIsWalletLoading(false);
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
    if (rechargeAmount === null || rechargeAmount === 0 || rechargeAmount < 0) {
      operationOk = false;
    }

    if (operationOk) {
      API.updateWallet(rechargeAmount, email).catch((e) => {
        console.log("Error recharging the wallet. " + e);
        setErrorMessage("Error recharging the wallet. " + e);
      });
      props.addMessage("successfully recharged your wallet");
      props.changeAction(0);
    } else {
      setErrorMessage("Wrong quantity");
    }
  };

  return (
    <PageSection>
      <BlockTitle>
        TopUp a Client's Wallet
      </BlockTitle>
      <Row>

        <ToastNotification
          variant='error'
          onSet={() => setErrorMessage("")}
          message={errorMessage}
        />

        <SearchComponent className='mx-auto' handleSearch={handleSearch} />
      </Row>

      {walletValue ? (
        <>
          {!isWalletLoading ? (
            <>

              <BlockTitle>
                Your Wallet
              </BlockTitle>
              <Form onSubmit={rechargeWallet}>
                <Form.Label> Actual Balance: </Form.Label>
                <Form.Control disabled type='text' value={walletValue} />
                <Form.Label> Recharge: </Form.Label>
                <Form.Control
                  className="im-input"
                  defaultValue={0}
                  min={0}
                  type='number'
                  onChange={(ev) => {
                    if (
                      isNaN(parseInt(ev.target.value)) ||
                      parseInt(ev.target.value) <= 0
                    ) {
                      setErrorMessage("wrong amount");
                      setRechargeAmount(-1);
                    } else setRechargeAmount(ev.target.value);
                  }}
                />
                <Button
                  onClick={rechargeWallet}
                  className='below im-button im-animate'
                >
                  Recharge the wallet
                </Button>
              </Form>
            </>
          ) : (
            <Container>
              <Spinner animation='border' variant='success'></Spinner>
            </Container>
          )}
        </>
      ) : (
        <></>
      )}
    </PageSection>
  );
}
export { TopUpWallet };
