describe('ConfirmProductsByFarmer', () => {

    //TODO -> Clean every information added during the tests

    before(() => {
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //runs once before all tests in the block -> Add new Client
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click();
        //Iscrivo un client
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.container > .justify-content-center > .spg-button').click()

        //Add an order
        //Mi sposto in un sabato del prossimo mese per poter fare l'ordine -> Sabato alle 9:30
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('#setHour').click().type('09:30')
        cy.wait(1000)
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('.modal-header > .btn-close').click()

        //Order n.1 -> To be Confirmed
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Add products
        cy.get('#search').type('Steak')
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('5')
        //click issue order button
        cy.get(':nth-child(5) > .spg-button').click()
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly!')
        //Close Alert
        cy.get('.btn-close').click()


        //Logout
        cy.get('[href="/"] > .bi').click()
        cy.clearCookies()
        Cypress.session.clearAllSavedSessions()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /confirm products/i }).click()

    })

    it('a farmer should be able to confirm product only between Sunday at 23:00 and Monday at 09:00 ', () => {
        //Mi sposto in un altra data per verificare di essere nella data giusta
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        //Il quindicesimo elemento è sempre un lunedi(ed esiste sempre per ogni mese)
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').type('09:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        //Provo per il resto della settimana
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(16)').click()
        cy.get('#setHour').type('09:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        //Provo per il resto della settimana
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(17)').click()
        cy.get('#setHour').type('09:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        //Provo per il resto della settimana
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(17)').click()
        cy.get('#setHour').type('09:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        //Provo per il resto della settimana
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(18)').click()
        cy.get('#setHour').type('09:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        //Provo per il resto della settimana
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(19)').click()
        cy.get('#setHour').type('09:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        //Provo il sabato prima dell'apertura
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').type('22:30')
        cy.wait(1000)
        //Check the farmer can not confirm an order
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

    })

    it('a shopEmployee should be able to confirm product and order should be confirmed when the wallet has not to be recharged', () => {

        //Mi sposto in un altra data per verificare di essere nella data giusta
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        //Il quattordicesimo elemento è sempre una domenica(ed esiste sempre per ogni mese)
        //Attenzione a non andare oltre al lunedi alle 9, in quel caso l'ordine va direttamente in missing products
        cy.get('#setHour').type('06:30')
        cy.wait(1000)
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('.modal-header > .btn-close').click()
        //Order n.1 gets confirmed
        cy.findByRole('button', { name: /confirm/i }).click()
        //Logout
        cy.get('[href="/"] > .bi').click()
        cy.clearCookies()

        //Check order state and user's wallet -> By user
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as User
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByRole('button', { name: /your orders/i }).click()
        //Check state
        cy.findByRole('cell', { name: /15€/i }).should('exist')
        cy.findByRole('cell', { name: /confirmed/i }).should('exist')
        //Check wallet
        cy.findByRole('button')
        cy.findByRole('button', { name: /personal mailbox/i }).click()
        cy.findByRole('heading', { name: /5/i })

    })


    it('an order should be pending cancellation when the wallet needs to be recherged and confirmed after the recharge', () => {

        //Logout
        cy.get('[href="/"] > .bi').click()
        cy.clearCookies()
        //Login as a ShopEmployee
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();

        //Order n.2 -> To be deleted
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Add products
        cy.get('#search').type('Banana')
        //Aggiungo 10 banane -> 30Euro
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('10')
        //click issue order button
        cy.get(':nth-child(5) > .spg-button').click()
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly!')
        //Close Alert
        cy.get('.btn-close').click()


        //Logout
        cy.get('[href="/"] > .bi').click()
        cy.clearCookies()
        //Login as a Farmer
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        cy.findByRole('textbox', { name: /email/i }).type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /confirm products/i }).click()
        //Mi sposto in un altra data per verificare di essere nella data giusta
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        //Il quattordicesimo elemento è sempre una domenica(ed esiste sempre per ogni mese)
        cy.get('#setHour').type('06:30')
        cy.wait(1000)
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('.modal-header > .btn-close').click()
        cy.wait(1500)
        //Order n.2 gets confirmed
        cy.findByRole('button', { name: /confirm/i }).click()
        //Logout
        cy.get('[href="/"] > .bi')
        cy.clearCookies()

        //Check order state and user's wallet -> By user
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as User
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByRole('button', { name: /your orders/i }).click()
        //Check state
        cy.findByRole('cell', { name: /30€/i }).should('exist')
        cy.findByRole('cell', { name: /pending cancellation/i }).should('exist')
        //Check wallet
        cy.findByRole('button')
        cy.findByRole('button', { name: /personal mailbox/i }).click()
        cy.findByRole('heading', { name: /you have not to recharge your wallet/i })
    })

    it('an order should be pending cancellation when the wallet needs to be reloaded and deleted after the missed recharge', () => {


    })



})