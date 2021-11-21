import React from 'react';
import { rerender, waitFor, fireEvent, getByText, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { NewOrder } from "./NewOrder";

//Mock API
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /api/wallet/mariorossi@demo.it" requests
    rest.get('/api/users/john.doe@demo01.it', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
            []
        ))
    }),
    rest.get('/api/products', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
            [{
                id: 1, quantity: 2, price: 2.5, name: "banana", farmer: 1
            },
            {
                id: 2, quantity: 8, price: 1.8, name: "albicocca", farmer: 2
            }]
        ))
    }),
    rest.get('/api/orders/1', (req, res, ctx) => {
        // respond using a mocked JSON body
        return res(ctx.json(
        ))
    })
    
)

const addMessage = () =>{

}

const changeAction = () =>{
    
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
it('NewOrder renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewOrder />, div);
});

//BASIC TEST

it("Each field should be in the document", () => {
    const utils = render(<NewOrder />)

    //Check Label
    expect(screen.getByLabelText("Client mail")).toBeInTheDocument();
    //Check button
    expect(screen.getByRole("button")).toBeInTheDocument();
    //Check input value
    expect(screen.getByRole("textbox")).toHaveValue("");


});

it("The entered info should be shown", () => {
    const utils = render(<NewOrder />)

    userEvent.type(screen.getByRole("textbox"), 'miki@gmail.com')
    expect(screen.getByRole("textbox")).toHaveValue('miki@gmail.com')


});

it("Products should be shown", async () => {

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('2.5 €')).toBeInTheDocument();
    expect(screen.getByText('max quantity : 2')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument()

    expect(screen.getByText('albicocca')).toBeInTheDocument();
    expect(screen.getByText('1.8 €')).toBeInTheDocument();
    expect(screen.getByText('max quantity : 8')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')[1]).toBeInTheDocument()

});

it("Order only should be processed with an email entered", async () => {

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })
    //CHECK UNDEFINED NOT COVERED
    /*
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid user')
    fireEvent.click(screen.getByText('Close alert'))
    //CHECK INVALID NOT COVERED
    userEvent.type(screen.getByRole('textbox'), '')
    expect(screen.getByRole('textbox')).toHaveValue("");

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid user')
    fireEvent.click(screen.getByText('Close alert'))
*/
});

it("Order only should be processed with a valid user", async () => {

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'john.doe@demo01.it' } })
    expect(screen.getByRole('textbox')).toHaveValue('john.doe@demo01.it')

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid user')
    fireEvent.click(screen.getByText('Close alert'))


});

it("Order only should be processed with a valid user(role)", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/users/john.doe@demo01.it', (req, res, ctx) => {
            return res(ctx.json(
                [{id: 1, role:1}]
            ))
        }),
    )

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'john.doe@demo01.it' } })
    expect(screen.getByRole('textbox')).toHaveValue('john.doe@demo01.it')

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid user')
    fireEvent.click(screen.getByText('Close alert'))


});

it("Order only should be processed with almost a product", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/users/john.doe@demo01.it', (req, res, ctx) => {
            return res(ctx.json(
                [{id: 1, role:0}]
            ))
        }),
    )

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'john.doe@demo01.it' } })
    expect(screen.getByRole('textbox')).toHaveValue('john.doe@demo01.it')

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })
    expect(screen.getByRole('alert')).toHaveTextContent(/Can't issue an order without items/)
    fireEvent.click(screen.getByText('Close alert'))
});


it("Order only should be processed with almost one element of a product", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/users/john.doe@demo01.it', (req, res, ctx) => {
            return res(ctx.json(
                [{id: 1, role:0}]
            ))
        }),
    )

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'john.doe@demo01.it' } })
    expect(screen.getByRole('textbox')).toHaveValue('john.doe@demo01.it')
   
    //Un prodotto si
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('spinbutton')
    })
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 1}})    
    expect(screen.getByRole('spinbutton')).toHaveValue(1)

    //Un prodotto senza quantità
    fireEvent.change(screen.getAllByRole('checkbox')[1], {target: {value: 1}})
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('spinbutton')
    })
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 0}})    
    expect(screen.getByRole('spinbutton')).toHaveValue(0)

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('alert')
    })
    expect(screen.getByRole('alert')).toHaveTextContent(/Quantity must be greater than 0/)
    fireEvent.click(screen.getByText('Close alert'))
});

it("Order should be processed with correct info", async () => {

    server.use(
        // override the initial "GET /api/wallet/mariorossi@demo.it" request handler
        // to return a 500 Server Error -> Nel caso in cui l'utente non è presente
        rest.get('/api/users/john.doe@demo01.it', (req, res, ctx) => {
            return res(ctx.json(
                [{id: 1, role:0}]
            ))
        }),
    )

    render(<NewOrder />);

    await waitFor(() => {
        screen.getByText('banana')
        screen.getByText('2.5 €')
        screen.getByText('max quantity : 2')

        screen.getByText('albicocca')
        screen.getByText('1.8 €')
        screen.getByText('max quantity : 8')
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'john.doe@demo01.it' } })
    expect(screen.getByRole('textbox')).toHaveValue('john.doe@demo01.it')
   
    //Un prodotto sopra la quantità max
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.getByRole('spinbutton')
    })
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 1}})    
    expect(screen.getByRole('spinbutton')).toHaveValue(1)


    fireEvent.click(screen.getByRole('button'))

});