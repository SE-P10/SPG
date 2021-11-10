import { LoginForm } from "./Login"
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';

const setup = () => {
    const utils = render(<LoginForm />)
    const username = utils.getByLabelText('Username');
    const password = utils.getByLabelText('Password');
    return {
        username,
        password,
        ...utils,
    }
}

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('LoginForm renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginForm />, div);
});



//React Testing Library(to test components in isolation from the child components they render)
it('Login renders username text', () => {
    render(<LoginForm />);
    expect(screen.getByText('Username')).toBeInTheDocument();
});
it('Login renders password text', () => {
    render(<LoginForm />);
    expect(screen.getByText('Password')).toBeInTheDocument();
});

//
it("Should be in the document and free text", () => {
    const { input } = setup()
    //Mi assicuro che ci sia un elemento di ruolo textbox e button nel documento (possono essere verificati mandando la getbyrole senza parametro)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveTextContent("");
    expect(screen.getByLabelText('Password')).toHaveTextContent("");

});


it("Should be the correct username inserted", () => {
    const { input } = setup()
    //Mi assicuro che ci sia un elemento di ruolo textbox e button nel documento (possono essere verificati mandando la getbyrole senza parametro)
    /*
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toHaveTextContent("");
    expect(screen.getByLabelText('Password')).toHaveTextContent("");

    */

    //Eseguo le azioni
    fireEvent.change(username, {
        target: { value: 'john.doe@demo01.it' },
    });
    expect(username.value).toBe('john.doe@demo01.it')

});

//
it("Should be the correct password inserted", () => {
    const { input } = setup()
    //Mi assicuro che ci sia un elemento di ruolo textbox e button nel documento (possono essere verificati mandando la getbyrole senza parametro)
    /*
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toHaveTextContent("");
    expect(screen.getByLabelText('Password')).toHaveTextContent("");

    */

    //Eseguo le azioni
    fireEvent.change(password, {
        target: { value: '$2b$10$OMHdOZ.PATpbMoaDz5013edi5QCTEFgpRv7Vn8OyDHQNN/4KXUKdi' },
    });
    expect(password.value).toBe('$2b$10$OMHdOZ.PATpbMoaDz5013edi5QCTEFgpRv7Vn8OyDHQNN/4KXUKdi')


});

