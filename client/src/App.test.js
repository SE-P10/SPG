import App from "./App"
import React from 'react';
import ReactDOM from 'react-dom';

//JEST
//Smoke Test -> The “smoke test” checks that a component renders without throwing (This test renders App with its children)
it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

// Altrà possibilità e quella di testare i componenti attraverso gli snapShot,la loro comodità riguarda il fatto che il componente viene fotografato
// nell'istante in cui viene eseguito il primo test, dopodiche ogni suo cambiamento verrà considerato come un test fallito.
// Questo permette di seguire le modifiche, se sono voloute, è possibile aggiornare lo snapshot
// E' possibile anche testare snapshot multipli(ricordando di aggiornare il precedente snapshot che diventa non più funzionale),
// questo permette di testare ad esempio passando delle props differenti