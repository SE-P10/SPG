import React from 'react';
import { fireEvent, getByLabelText, getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { RegistrationForm } from "./RegistrationForm";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('RegistrationForm should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegistrationForm />, div);
});

it("Each field should be in the document and free of text", () => {
    const utils = render(<RegistrationForm message="" />)

    //Check Label
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Surname")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    //Check input
    expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Surname")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    //Check input value
    expect(screen.getByPlaceholderText("Enter Name")).toHaveValue("");
    expect(screen.getByPlaceholderText("Enter Surname")).toHaveValue("");
    expect(screen.getByPlaceholderText("Enter Username")).toHaveValue("");
    expect(screen.getByPlaceholderText("Enter Email")).toHaveValue("");
    expect(screen.getByPlaceholderText("Enter Password")).toHaveValue("");
    expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue("");
    //Check button
    expect(screen.getByRole('button')).toBeInTheDocument();

});

it("The entered info should be shown", () => {
    const utils = render(<RegistrationForm message="" />)

    userEvent.type(screen.getByPlaceholderText("Enter Name"), 'Basilico')
    expect(screen.getByPlaceholderText("Enter Name")).toHaveValue('Basilico')

    userEvent.type(screen.getByPlaceholderText("Surname"), 'Basilico')
    expect(screen.getByPlaceholderText("Surname")).toHaveValue('Basilico')

    userEvent.type(screen.getByPlaceholderText("Enter Username"), 'Miki')
    expect(screen.getByPlaceholderText("Enter Username")).toHaveValue('Miki')

    userEvent.type(screen.getByPlaceholderText("Enter Email"), 'miki@gmail.it')
    expect(screen.getByPlaceholderText("Enter Email")).toHaveValue('miki@gmail.it')

    userEvent.type(screen.getByPlaceholderText("Enter Password"), 'password')
    expect(screen.getByPlaceholderText("Enter Password")).toHaveValue('password')

    userEvent.type(screen.getByPlaceholderText("Confirm Password"), 'password1')
    expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue('password1')


});


it("Alert should be shown if there is not-filled field", async () => {
    const utils = render(<RegistrationForm message="" />)

    //No filled field  
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

    //No name
    userEvent.type(screen.getByPlaceholderText("Surname"), 'Basilico')
    userEvent.type(screen.getByPlaceholderText("Enter Username"), 'Miki')
    userEvent.type(screen.getByPlaceholderText("Enter Email"), 'miki@gmail.it')
    userEvent.type(screen.getByPlaceholderText("Enter Password"), 'password')
    userEvent.type(screen.getByPlaceholderText("Confirm Password"), 'password')
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

    //No Surname
    userEvent.type(screen.getByPlaceholderText("Enter Name"), 'Michele')
    userEvent.clear(screen.getByPlaceholderText("Surname"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

    //No Username
    userEvent.type(screen.getByPlaceholderText("Surname"), 'Basilico')
    userEvent.clear(screen.getByPlaceholderText("Enter Username"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

    //No Email
    userEvent.type(screen.getByPlaceholderText("Enter Username"), 'miki')
    userEvent.clear(screen.getByPlaceholderText("Enter Email"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

    //No Password
    userEvent.type(screen.getByPlaceholderText("Enter Email"), 'miki@gmail.it')
    userEvent.clear(screen.getByPlaceholderText("Enter Password"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

    //No Confirm Password
    userEvent.type(screen.getByPlaceholderText("Enter Password"), 'password')
    userEvent.clear(screen.getByPlaceholderText("Confirm Password"))
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Missing Data, check all the fields");
    fireEvent.click(screen.getByText('Close alert'))

});

it("Alert should be shown if there is password missmatch", async () => {
    const utils = render(<RegistrationForm message="" />)

    userEvent.type(screen.getByPlaceholderText("Enter Name"), 'Basilico')
    userEvent.type(screen.getByPlaceholderText("Surname"), 'Basilico')
    userEvent.type(screen.getByPlaceholderText("Enter Username"), 'Miki')
    userEvent.type(screen.getByPlaceholderText("Enter Email"), 'miki@gmail.it')
    userEvent.type(screen.getByPlaceholderText("Enter Password"), 'password')
    userEvent.type(screen.getByPlaceholderText("Confirm Password"), 'password1')
    fireEvent.click(screen.getByRole('button'))
    await expect(screen.getByRole("alert")).toHaveTextContent("Password Mismatch");
    fireEvent.click(screen.getByText('Close alert'))

});


//There are not constraints to test!!!!!!!!!