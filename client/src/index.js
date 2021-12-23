import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from 'react-toast-notifications';
import "./css/index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider
      autoDismiss={true}
      newestOnTop={true}
      autoDismissTimeout={3500}
    >
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
