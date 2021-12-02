import React from 'react';
import { rerender, waitFor, fireEvent, getByText, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { CheckOrders } from "./CheckOrders";

//Mock API
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /api/wallet/mariorossi@demo.it" requests
    rest.get('/api/orders/john.doe@demo01.it', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
            [{
                id: 1,
                user_id: 1,
                status: "done",
                price: 10,
                pickup_time: "5-11-21-10-00-10",
                pickup_place: "TO"
            }]
        ))
    }),
    rest.get('/api/orders/miki', (req, res, ctx) => {
        return res(ctx.status(500))
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
it('CheckOrders renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CheckOrders />, div);
});

//BASIC TEST

it("Each field should be in the document and free of text", () => {
    const utils = render(<CheckOrders />)

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


//SEARCH TEST

//NON VIENE GESTITA LA API -> DA RISOLVERE
/*it("Alert should be shown if the input is not an email", async () => {

    const utils = render(<CheckOrders />)

    //No Email
    userEvent.type(screen.getByRole('textbox'), 'miki')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole("alert")

    })
    //Dovrei ricevere un errore diverso!
    await expect(screen.getByRole("alert")).toHaveTextContent("No orders found for this user.");
    fireEvent.click(screen.getByText('Close alert'))

});
*/

it("Orders should be shown after search", async () => {

    render(<CheckOrders />);
    //get da errore se non trova l'elemento, bisogna usare queryBy
    expect(screen.queryByText('id : 1')).not.toBeInTheDocument();
    expect(screen.queryByText('price : 10')).not.toBeInTheDocument();
    expect(screen.queryByText('status : done')).not.toBeInTheDocument();

    userEvent.type(screen.getByRole("textbox"), 'john.doe@demo01.it')
    expect(screen.getByRole('textbox')).toHaveValue("john.doe@demo01.it");

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByText('id : 1')
        screen.getByText('price : 10')
        screen.getByText('status : done')
    })

    expect(screen.queryByText('id : 1')).toBeInTheDocument();
    expect(screen.queryByText('price : 10')).toBeInTheDocument();
    expect(screen.queryByText('status : done')).toBeInTheDocument();
});

it("Alert should be shown if there is not orders", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/orders/john.doe@demo01.it', (req, res, ctx) => {
            return res(ctx.json(
                []
            ))
        }),
    )

    render(<CheckOrders />);
    //get da errore se non trova l'elemento, bisogna usare queryBy

    userEvent.type(screen.getByRole("textbox"), 'john.doe@demo01.it')
    expect(screen.getByRole('textbox')).toHaveValue("john.doe@demo01.it");

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })

    expect(screen.getByRole('alert')).toHaveTextContent("No orders found for this user.")
});

//COINCIDONO SE NON VIENE AGGIUSTATO LATO FRONT END(con il test senza email)
/*
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
*/