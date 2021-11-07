import LoginForm from "./Login"
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js

//React Testing Library(to test components in isolation from the child components they render)
it('Login renders username text', () => {
    render(<LoginForm />);
    expect(screen.getByText('Username')).toBeInTheDocument();
});
it('Login renders password text', () => {
    render(<LoginForm />);
    expect(screen.getByText('Password')).toBeInTheDocument();
});