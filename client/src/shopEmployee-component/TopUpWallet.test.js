//HERE THERE IS AN EXAMPLE OF HOW TO DO A TEST ON A COMPONENT WITH API CALL

import React from 'react';
import { rerender, waitFor, fireEvent, getByText, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { TopUpWallet } from "./TopUpWallet";

//Mock API
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /api/wallet/mariorossi@demo.it" requests
    rest.get('/api/wallet/mariorossi@demo.it', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json({ wallet: 5 }))
    }),
    // capture "POST /api/wallet/update/" requests -> Non ci sono parametri, se voglio far finta che vada bene la sovrascrivo
    rest.post('/api/wallet/update/', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.status(500))
    }),
)

const changeAction = () => {

}
const addMessage = () => {
    
}

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('RegistrationForm shoulds render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopUpWallet />, div);
});

//BASIC TEST

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

/*
it("Alert should be shown if there is not the email", async () => {
    //QUA DEVE ESSERCI UN CONTROLLO PRIMA DELLA API PERO

    const utils = render(<TopUpWallet />)

    //No Email
    //userEvent.type(screen.getByPlaceholderText("Enter Username"), 'miki')
    //userEvent.clear(screen.getByPlaceholderText("Enter Email"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Email");
    fireEvent.click(screen.getByText('Close alert'))

});
*/

it("Alert should be shown if the input is not an email", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/wallet/miki', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    )

    const utils = render(<TopUpWallet />)

    //No Email
    userEvent.type(screen.getByRole('textbox'), 'miki')
    //userEvent.clear(screen.getByPlaceholderText("Enter Email"))
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole("alert")

    })
    await expect(screen.getByRole("alert")).toHaveTextContent("No user found.");
    fireEvent.click(screen.getByText('Close alert'))

});

//SEARCH TEST

it("Wallet Value should be shown after search", async () => {

    render(<TopUpWallet />);

    //get da errore se non trova l'elemento, bisogna usare queryBy
    expect(screen.queryByText('Recharge the wallet')).not.toBeInTheDocument();
    expect(screen.queryByText('Actual Balance:')).not.toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox"), 'mariorossi@demo.it')
    expect(screen.getByRole('textbox')).toHaveValue("mariorossi@demo.it");

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByText('Recharge the wallet')
        screen.getByText('Actual Balance:')

    })
    expect(screen.getByText('Recharge the wallet')).toBeInTheDocument();
    expect(screen.getByText('Actual Balance:')).toBeInTheDocument();

});

it("Wallet Value should not be shown after search if the email does not exist and alert should pop up", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/wallet/mariorossi@demo.it', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    )

    render(<TopUpWallet />);

    //get da errore se non trova l'elemento, bisogna usare queryBy
    expect(screen.queryByText('Recharge the wallet')).not.toBeInTheDocument();
    expect(screen.queryByText('Actual Balance:')).not.toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox"), 'mariorossi@demo.it')
    expect(screen.getByRole('textbox')).toHaveValue("mariorossi@demo.it");

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        //Aspetto e controllo l'alert
        screen.getByRole("alert")
    })
    expect(screen.getByRole("alert")).toHaveTextContent("No user found.");
    fireEvent.click(screen.getByText('Close alert'))

    expect(screen.queryByText('Recharge the wallet')).not.toBeInTheDocument();
    expect(screen.queryByText('Actual Balance:')).not.toBeInTheDocument();

});

//RECHARGE TEST

it("After correct search new elements should be visible", async () => {

    render(<TopUpWallet />);

    //Eseguo la search correttamente
    //get da errore se non trova l'elemento, bisogna usare queryBy
    userEvent.type(screen.getByRole("textbox"), 'mariorossi@demo.it')
    expect(screen.getByRole('textbox')).toHaveValue("mariorossi@demo.it");
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByText('Recharge the wallet')
        screen.getByText('Actual Balance:')
        screen.getByText('Recharge:')
    })
    expect(screen.getByText('Recharge the wallet')).toBeInTheDocument();
    expect(screen.getByText('Actual Balance:')).toBeInTheDocument();
    expect(screen.getByText('Recharge:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();

});



it("Recharge should be enabled only with number,positive and grater than 0", async () => {

    render(<TopUpWallet />);

    //Eseguo la search correttamente
    //get da errore se non trova l'elemento, bisogna usare queryBy
    userEvent.type(screen.getByRole("textbox"), 'mariorossi@demo.it')
    expect(screen.getByRole('textbox')).toHaveValue("mariorossi@demo.it");
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByText('Recharge the wallet')
        screen.getByText('Actual Balance:')
        screen.getByText('Recharge:')
    })

    //Check with 0
    userEvent.type(screen.getByRole('spinbutton'), 0)
    expect(screen.getByRole('spinbutton')).toHaveValue(0);

    fireEvent.click(screen.getByText('Recharge the wallet'))

    await waitFor(() => {
        screen.getByRole("alert")
    })
    expect(screen.getByRole("alert")).toHaveTextContent("The amount must be greater than 0.");
    fireEvent.click(screen.getByText('Close alert'))
    //Check with negative
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: '-100'}})
    expect(screen.getByRole('spinbutton')).toHaveValue(-100);
    fireEvent.click(screen.getByText('Recharge the wallet'))
    
    await waitFor(() => {
        screen.getByRole("alert")
    })
    expect(screen.getByRole("alert")).toHaveTextContent("The amount must be greater than 0.");
    fireEvent.click(screen.getByText('Close alert'))

    //Check with letters
    userEvent.type(screen.getByRole('spinbutton'), 'ciao')
    expect(screen.getByRole('spinbutton')).toHaveValue(null);

});

it("Alert should pop up if the recharge is not completed", async () => {

    render(<TopUpWallet addMessage = {addMessage} changeAction = {changeAction} />);

    //get da errore se non trova l'elemento, bisogna usare queryBy
    userEvent.type(screen.getByRole("textbox"), 'mariorossi@demo.it')
    expect(screen.getByRole('textbox')).toHaveValue("mariorossi@demo.it");
    fireEvent.click(screen.getByRole('button'))
    
    await waitFor(() => {
        //Aspetto e controllo l'alert
        screen.getByRole('spinbutton')
    })

    userEvent.clear(screen.getByRole('spinbutton'))
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: '100'}})
    expect(screen.getByRole('spinbutton')).toHaveValue(100);

    fireEvent.click(screen.getByText('Recharge the wallet'))
    
    await waitFor(() => {
        //Aspetto e controllo l'alert
        screen.getByRole('alert')
    })

    expect(screen.getByRole('alert')).toHaveTextContent(/Error recharging the wallet./);

});