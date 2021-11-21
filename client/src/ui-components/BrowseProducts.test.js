import React from 'react';
import { rerender, waitFor, fireEvent, getByText, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { BrowserProducts } from "./BrowseProducts";

//Mock API
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /api/wallet/mariorossi@demo.it" requests
    rest.get('/api/products', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
            [{
                id: 1, quantity: 2, price: 2.5, name: "banana", farmer: 1
            }]
        ))
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
it('BrowserProducts renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserProducts />, div);
});

//BASIC TEST

it("Each field should be in the document and free of text", () => {
    const utils = render(<BrowserProducts />)

    //Check column
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();


});

//HOW TO TEST A COMPONENT WITH USEEFFECT

it("Products should be shown", async () => {

    render(<BrowserProducts />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('2')
    })
    expect(screen.queryByText('banana')).toBeInTheDocument();
    expect(screen.queryByText('2.5 €')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
});
