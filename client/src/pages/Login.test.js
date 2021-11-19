import { LoginForm } from "./Login"
import React from 'react';
import { fireEvent, getByLabelText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';

const doLoginStub = () => {
    
}
const closeMessageStub = () => {
    message = ""
}

const setup = () => {
    const utils = render(<LoginForm message='' />)
    const username = utils.getByLabelText('Username');
    const password = utils.getByLabelText('Password');
    const button = utils.getByRole('button');
    return {
        username,
        password,
        button,
        ...utils,
    }
}

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('LoginForm renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginForm message='' />, div);
});



//React Testing Library(to test components in isolation from the child components they render)
it('Login renders username text', () => {
    render(<LoginForm message='' />);
    expect(screen.getByText('Username')).toBeInTheDocument();
});
it('Login renders password text', () => {
    render(<LoginForm message='' />);
    expect(screen.getByText('Password')).toBeInTheDocument();
});

//
it("Username and Password fields Should be in the document and free of text", () => {
    const { input } = setup()
    //Mi assicuro che ci sia un elemento di ruolo textbox e button nel documento (possono essere verificati mandando la getbyrole senza parametro)
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(username).toHaveTextContent("");
    expect(password).toHaveTextContent("");

});


it("The entered username should be shown", () => {
    const { input } = setup()
    //Cambio il valore dell'input username
    userEvent.type(username, 'john.doe@demo01.it');
    //Verifico che sia stato cambiato
    expect(username).toHaveValue('john.doe@demo01.it')

});

//
it("The entered password should be shown", () => {
    const { input } = setup()
    //Cambio il valore dell'input username
    userEvent.type(password, 'password');
    //Verifico che sia stato cambiato
    expect(password).toHaveValue('password')

});

it("Login check with wrong data", async () => {

    //Dal momento che la setMessage viene cambiata da App, è esterna al componente Login e non è di interesse dello unit test
    //Quello che può essere testato è cosa succede nel momento in cui viene settato il message e quindi cosa viene reindirizzato quando
    //ho gia un message, per cui renderizzo solamente il componente con il msg passato
    const utils = render(<LoginForm login={doLoginStub} message={{ msg: "Incorrect Username and Password", type: "danger" }} closeMessage={closeMessageStub} />)
    //Controllo l'alert, tenendo conto che è un evento asincrono
    await waitFor(() => screen.getByRole('alert'))
    expect(screen.getByRole('alert')).toHaveTextContent('Incorrect Username and Password')

});

it("Login should not be enabled without email", async () => {

    const utils = render(<LoginForm login={doLoginStub} message="" closeMessage={closeMessageStub} />)
    //Scrivo solo lo username
    userEvent.type(screen.getByText('Username'), 'Gianni@gmail.com');
    expect(screen.getByRole('button')).toBeDisabled()

});

it("Login should not be enabled without password", async () => {

    const utils = render(<LoginForm login={doLoginStub} message="" closeMessage={closeMessageStub} />)
    //Scrivo solo la password
    userEvent.type(screen.getByText('Password'), 'password');
    expect(screen.getByRole('button')).toBeDisabled()

});

it("Login should not be enabled without email and password", async () => {

    const utils = render(<LoginForm login={doLoginStub} message="" closeMessage={closeMessageStub} />)
    //Scrivo solo la password
    userEvent.type(screen.getByText('Password'), 'password');
    expect(screen.getByRole('button')).toBeDisabled()

});

it("Login should be enabled with email and password", async () => {

    const utils = render(<LoginForm login={doLoginStub} message="" closeMessage={closeMessageStub} />)
    //Scrivo la email
    userEvent.type(screen.getByText('Username'), 'Gianni@gmail.com');
    //Scrivo la password
    userEvent.type(screen.getByText('Password'), 'password');
    expect(screen.getByRole('button')).toBeEnabled()

});







/*
it("Login check with right data",  async () => {

    //In questo test viene chiamata anche la funzione props.Login, che deriva da App. Noi vogliamo testare solo Login per cui dovremo simularla.
    //Altro motivo per cui è necessario simularla è che tale funziona contiene una chiamata asincrona alle API, che richiedono tempo, sono dispendiose,
    //ed infine non ci permettono di porre l'attenzione solo sul front end, ma entra in gioco anche il back end

    //Per simulare una funzione asincrona esistono due metodi, jest.fn e spyOn, vedi la differenza su appunti (the only difference is that
    //YOU CAN RESTORE ORIGINAL FUNCTION with jest.spyOn and you can't with jest.fn.)
    //Stiamo facendo Unit test, ci interessa solo del componente login
    const fakeUser = { id: 1, name: "Michele Basilico", role: "0" };
    //const loginSuccess = jest.fn(() => Promise.resolve(successResult));
    //const loginFail = jest.fn(() => Promise.reject(new Error()));
    //spyOn in questo modo mi permette di reimplementare la funzione come fosse semplicemente una restituzione di un dato
    const login = jest.spyOn(global, "login.prototype").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<LoginForm login={login} />, container);

        //Inserisco correttamente i dati di Login
        userEvent.type(screen.getByLabelText("Username"), 'john.doe@demo01.it');
        userEvent.type(screen.getByLabelText("Password"), '$2b$10$OMHdOZ.PATpbMoaDz5013edi5QCTEFgpRv7Vn8OyDHQNN/4KXUKdi');
        //To Fix: Button non funziona dal setup;
        userEvent.click(screen.getByRole('button'));
    });



});
*/