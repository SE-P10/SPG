import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { HomePage } from "./HomePage";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('HomePage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage />, div);
  });