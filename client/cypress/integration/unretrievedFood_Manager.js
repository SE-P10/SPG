describe('pendingOrders', () => {

    before(() => {
        //runs once before all tests in the block -> Add new Client

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')


    })

    beforeEach(() => {


    })

    //COSTRETTO A DOVER CONTROLLARE TUTTO NELLO STESSO TEST, IL CRONO(INSIEME A CYPRESS CHE CANCELLA ROBA) ALTRIMENTI ROMPE TUTTOOOOOOOO!
    it('a manager should be able to view the unretrieved orders(weekly and monthly) and a user should be notified after four unretrieved orders', () => {

        //WHIT EMPTY DB -> ADD THE OTHER ORDERS

        //AS a shopEmployee -> Add 1 new Clients
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a shopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click({ force: true });
        //Iscrivo un client
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Michele')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //Recharge Michele's wallet
        //AS A SHOP EMPLOYEE -> RECHARGE THE CLIENT'S WALLET
        cy.findByRole('button', { name: /topup a wallet/i }).click({ force: true });
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(11)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Enter right email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //type a number to recharge
        cy.findByRole('spinbutton').clear()
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        cy.findByRole('spinbutton').type('100');
        //click on recharge button
        cy.findByRole('button', { name: /recharge the wallet/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'successfully recharged your wallet')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //As a shopEmployee -> Make a new order for each one of the client (ORDER 1)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
        //Aggiungo 1 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/1 Banana/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //As a shopEmployee -> Make a new order for each one of the client (ORDER 2)
        //With recharged wallet:
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
        //Aggiungo 5 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/1 Banana/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //As a shopEmployee -> Make a new order for each one of the client (ORDER 3)
        //With recharged wallet:
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
        //Aggiungo 5 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/1 Banana/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //SCENARIO: DB FILLS UP WITH 3 DELETED ORDERS(FOR MISSED RETRIEVED)
        //As a shopEmployee -> Make a new order for each one of the client (ORDER n. 4)
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
        //Aggiungo 1 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/1 Banana/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //Change date for farmer confirmation
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').click().type("07:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.wait(1500)
        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.wait(1000);

        //AS A FARMER -> CONFIRM THE ORDER
        //Login as a farmer
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Vado sulla conferma prodotti
        cy.findByRole('button', { name: /confirm products/i }).click({ force: true })
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation ok')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //Change date for delete order CRONO
        cy.findByRole('button', { name: /set/i }).click()
        //Next week -> Order should get deleted
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').click().type("12:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Change date for hand out CRONO
        cy.findByRole('button', { name: /set/i }).click()
        //Next week -> Order should get deleted
        cy.get('.react-calendar__month-view__days > :nth-child(18)').click()
        cy.get('#setHour').click().type("12:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Change date for hand out CRONO
        cy.findByRole('button', { name: /set/i }).click()
        //Next week -> Order should get deleted
        cy.get('.react-calendar__month-view__days > :nth-child(21)').click()
        cy.get('#setHour').click().type("10:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.wait(2500);

        //AS A CLIENT -> CHECK NOTIFICATIONS 
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByRole('button', { name: /personal mailbox/i }).click({ force: true });
        //Check unretrieved orders notification
        cy.findByRole('button', { name: /readme!/i }).click({ force: true })
        cy.get('.modal-title').should('include.text', 'Unretrieved orders')
        cy.get('.modal-body').should('include.text', "Pay attention, you missed the pickup of four orders!")
        cy.get('.modal-footer')
            .findByRole('button')
            .click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.wait(1000)

        //Check on manager page:
        //Login as a manager
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        cy.get('#username').type('michi@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByRole('button', { name: /see statistics/i }).click({ force: true });

    })

})