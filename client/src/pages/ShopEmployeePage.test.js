import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { ShopEmployee } from "./ShopEmployeePage";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('ShopEmployee renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ShopEmployee />, div);
  });


/*
//React Testing Library(to test components in isolation from the child components they render)
it('ShopEmployee renders buttons', () => {
    render(<ShopEmployee />);
    expect(screen.getByText('Register client')).toBeInTheDocument();
    expect(screen.getByText('Pending orders')).toBeInTheDocument();
    expect(screen.getByText('Browse Products')).toBeInTheDocument();
    expect(screen.getByText('TopUp a Wallet')).toBeInTheDocument();
    expect(screen.getByText('New Order')).toBeInTheDocument();
    expect(screen.getByText('Hand Out')).toBeInTheDocument();
    expect(screen.getByText('Check Orders')).toBeInTheDocument();

});

it('Each button should be enabled', () => {
  render(<ShopEmployee />);
  expect(screen.getByText('Register client')).toBeEnabled();
  expect(screen.getByText('Pending orders')).toBeEnabled();
  expect(screen.getByText('Browse Products')).toBeEnabled();
  expect(screen.getByText('TopUp a Wallet')).toBeEnabled();
  expect(screen.getByText('New Order')).toBeEnabled();
  expect(screen.getByText('Hand Out')).toBeEnabled();
  expect(screen.getByText('Check Orders')).toBeEnabled();

});
*/