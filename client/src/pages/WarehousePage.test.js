import React from 'react';
import { render, screen,fireEvent, queryByText, waitFor } from '@testing-library/react';
//import userEvent from '@testing-library/user-event'
//import '@testing-library/jest-dom'; in setupTests.js
import ReactDOM from 'react-dom';
import { WarehousePage } from "./WarehousePage";

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('WarehousePage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WarehousePage user = {{name: 'Michele'}} />, div);
  });

//Check on ManageDeliveryButton
it('Warehouse should be able to manage delivery from Monday at 09:00 to Tuesday at 18:00', async () =>  {
    const div = document.createElement('div');
    ReactDOM.render(<WarehousePage user = {{name: 'Michele'}}  dow={"Monday"} hour={10} />, div);

    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.queryByText('You can ack arrivals from Monday at 09:00 to Tuesday at 18:00')
    })
    expect(screen.getByText('You can ack arrivals from Monday at 09:00 to Tuesday at 18:00')).toBeInTheDocument();


  });
/*
  //Check on ManageDeliveryButton
it('Warehouse should be not able to manage delivery from Tuesday at 18:00 to Monday at 09:00', async () =>  {
    const div = document.createElement('div');
    ReactDOM.render(<WarehousePage user = {{name: 'Michele'}}  dow={"Tuesday"} hour={19} />, div);

    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
        // getByRole throws an error if it cannot find an element
        screen.queryByText('')
    })
    expect(screen.getByText('')).toBeInTheDocument();


  });
*/