import React from 'react';
import { waitFor, fireEvent, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { NewOrder } from "./NewOrder";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('NewOrderForm should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewOrder />, div);
});

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

/*
it("Shop Employee should be able to check a product", async () => {
    const utils = render(<NewOrder/>)
    const checkboxs = await waitFor(() => {
        expect(getByRole('checkbox')).toBeInTheDocument()
      })
    expect(checkboxs.checked).toHaveValue("False")


});
*/