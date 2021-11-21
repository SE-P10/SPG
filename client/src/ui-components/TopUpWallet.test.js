import React from 'react';
import { rerender, waitFor, fireEvent, getByText, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { TopUpWallet } from "./TopUpWallet";

//Mock API
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/wallet/mariorossi@demo.it', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json({ wallet: { email: 'mariorossi@demo.it', meta_value: "5" } }))
    }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('RegistrationForm should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopUpWallet />, div);
});


it("Each field should be in the document and free of text", () => {
    const utils = render(<TopUpWallet />)

    //Check Text
    expect(screen.getByText("Insert client email to procede:")).toBeInTheDocument();
    //Check input
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    //Check input value
    expect(screen.getByRole("textbox")).toHaveValue("");
    //Check button
    expect(screen.getByRole('button')).toBeInTheDocument();

});


it("Alert should be shown if there is not the email", async () => {
    const utils = render(<TopUpWallet />)

    //No Email
    //userEvent.type(screen.getByPlaceholderText("Enter Username"), 'miki')
    //userEvent.clear(screen.getByPlaceholderText("Enter Email"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Email");
    fireEvent.click(screen.getByText('Close alert'))

});

it("Alert should be shown if the input is not an email", async () => {
    const utils = render(<TopUpWallet />)

    //No Email
    userEvent.type(screen.getByRole('textbox'), 'miki')
    //userEvent.clear(screen.getByPlaceholderText("Enter Email"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("You should enter an email");
    fireEvent.click(screen.getByText('Close alert'))

});

//Dice che l'utente non è stato trovato mannagg a miserij mannagg, probabilmente perchè non viene aggiornato il componente figlio

it("Wallet Value should be shown after search", async () => {

    render(<TopUpWallet />);

    //get da errore se non trova l'elemento, bisogna usare queryBy
    expect(screen.queryByText('Recharge the wallet')).not.toBeInTheDocument();
    expect(screen.queryByText('Actual Balance:')).not.toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox"), 'mariorossi@demo.it')
    expect(screen.getByRole('textbox')).toHaveValue("mariorossi@demo.it");

    fireEvent.click(screen.getByRole('button'))


    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByText('Recharge the wallet')
        screen.getByText('Actual Balance:')

    })
    expect(screen.getByText('Recharge the wallet')).toBeInTheDocument();
    expect(screen.getByText('Actual Balance:')).toBeInTheDocument();

});

