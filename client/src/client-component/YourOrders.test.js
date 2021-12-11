import React from 'react';
//import '@testing-library/jest-dom'; in setupTests.js
import {screen, render, waitFor} from '@testing-library/react'
import ReactDOM from 'react-dom';
import { YourOrders } from "./YourOrders";

//Mock API
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /api/wallet/mariorossi@demo.it" requests
    rest.get('/api/products/:email', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
            [{
                id:1,
                user_id:1,
                status:"done",
                price:10,
                pickup_time:"5-11-21-10-00-10",
                pickup_place:"TO"
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
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders YouOrders with its children)
it('YourOrders renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YourOrders />, div);
  });


it("YourOrders trying to emulate useeffect", async () => {
    const user = {email:'mariorossi@demo.it'}

    render(<YourOrders user={user}/>);

    await waitFor(() => {
        screen.getByText('List of your orders')
    })
    expect(screen.queryByText('List of your orders')).toBeInTheDocument();

});