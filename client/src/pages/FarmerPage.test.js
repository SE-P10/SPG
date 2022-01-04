import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { FarmerPage } from "./FarmerPage";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('FarmerPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FarmerPage user = {{name: 'Michele'}} />, div);
  });