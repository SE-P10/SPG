import LoginForm from "./Login"
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';

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