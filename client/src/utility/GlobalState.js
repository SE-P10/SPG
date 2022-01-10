import React from 'react';

const GlobalState = React.createContext([{}, () => {console.log("context")}]);

export default GlobalState;