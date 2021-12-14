//Initializing Test Environment
//When app uses a browser API that you need to mock in your tests or if you need a global setup before running your tests,
// add a src/setupTests.js to your project. It will be automatically executed before running your tests.
// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
//La importo qui così viene importata prima di ogni test


//Setup example
/* 
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;
  */

  
import '@testing-library/jest-dom';
