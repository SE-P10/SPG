import React from 'react';
import { rerender, waitFor, fireEvent, getByText, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { SearchComponent } from "./SearchComponent";

const handleSearch = (emailValue) => {

};

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('RegistrationForm should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchComponent />, div);
});


it("Each field should be in the document and free of text", () => {
    const utils = render(<SearchComponent />)

    //Check Text
    expect(screen.getByText("Insert client email to procede:")).toBeInTheDocument();
    //Check input
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    //Check input value
    expect(screen.getByRole("textbox")).toHaveValue("");
    //Check button
    expect(screen.getByRole('button')).toBeInTheDocument();

});

it("The entered field should be shown", () => {
    const utils = render(<SearchComponent />)

    userEvent.type(screen.getByRole("textbox"), 'michelebasilico@gmail.it')
    expect(screen.getByRole("textbox")).toHaveValue('michelebasilico@gmail.it')

});

//Non inserito come controllo nell'app
/*

it("The entered field should be an email", () => {
    const utils = render(<SearchComponent message="" />)

    //No input
    userEvent.clear(screen.getByRole("textbox"))
    expect(screen.getByRole("textbox")).toHaveValue('')
    expect(screen.getByRole("button")).not.toBeEnabled()

    //No email
    userEvent.type(screen.getByRole("textbox"), 'michelebasilico')
    expect(screen.getByRole("textbox")).toHaveValue('michelebasilico')
    expect(screen.getByRole("button")).not.toBeEnabled()
    userEvent.clear(screen.getByRole("textbox"))

    userEvent.type(screen.getByRole("textbox"), '123@')
    expect(screen.getByRole("textbox")).toHaveValue('123@')
    expect(screen.getByRole("button")).not.toBeEnabled()
    userEvent.clear(screen.getByRole("textbox"))

});

*/