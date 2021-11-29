import App from "./App"
import React from 'react';
import ReactDOM from 'react-dom';
import {act} from "react-dom/test-utils"

//Inizializzazione e Chiusura
/* 
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
*/


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


//API TEST
/* Testare le API è sconsigliato per una serie di motivi (vedi appunti).
Invece di richiamare le API reali nei test, è possibile simulare le richieste attraverso dei dati fittizi, questo evita sopratutto di 
ottenere test falliti a causa di un back end non disponibili o per ragioni comunque non legate al codice , oltre a rendere i test molto più veloci.
Questo comunque non significa che non ci possono essere test anche che valutano l'applicazione complessivamente attraverso dei frame work back end */
//Data Fetching
/*it("renders user data", async () => {
  const fakeUser = {
    id: 1,
    name: "Michele Basilico",
    role: "0",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});*/