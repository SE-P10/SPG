import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { ShopEmployee } from "./ShopEmployee";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('ShopEmployee renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShopEmployee />, div);
  });



//React Testing Library(to test components in isolation from the child components they render)
it('ShopEmployee renders buttons', () => {
    render(<ShopEmployee />);
    expect(screen.getByText('ShopEmployee personal page')).toBeInTheDocument();
    expect(screen.getByText('Register a Client')).toBeInTheDocument();
    expect(screen.getByText('Browse Products')).toBeInTheDocument();
    expect(screen.getByText('TopUp a Wallet')).toBeInTheDocument();
    expect(screen.getByText('New Order')).toBeInTheDocument();
    expect(screen.getByText('HandOut')).toBeInTheDocument();
   // expect(screen.getByText('Check Order')).toBeInTheDocument();

});
