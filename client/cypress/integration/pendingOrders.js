describe('pendingOrders', () => {

    before(() => {
        //runs once before all tests in the block -> Add new Client

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //AS a shopEmployee -> Add 2 new Clients
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
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click({ force: true });
        //Iscrivo un client
        cy.get('#formGridName').type('Maria')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Mary')
        cy.get('#formGridEmail').type('maria@gmail.com')
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

        //As a shopEmployee -> Make a new order for each one of the client
        //With recharged wallet:
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.container-fluid > .d-flex > .btn').click()
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
        //Aggiungo 5 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(5, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Aggiungo 5 mele
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('textbox')
            .type(5, { force: true })
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/5 Banana/i).should('exist')
        cy.findByText(/5 Melon/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //With recharged wallet but without confirmation by farmer
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
        //Aggiungo 5 sausage
        cy.get('.container > .im-grid > :nth-child(8)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(8)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Aggiungo 5 fontina
        cy.get('.container > .im-grid > :nth-child(9)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(9)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/1 Sausage/i).should('exist')
        cy.findByText(/1 Fontina/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //With unrecharged wallet:
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByLabelText('Client mail').type("maria@gmail.com", { force: true })
        //Aggiungo 5 ?
        cy.get('.container > .im-grid > :nth-child(3)')
            .findByRole('textbox')
            .type(5, { force: true })
        cy.get('.container > .im-grid > :nth-child(3)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Aggiungo 5 ?
        cy.get('.container > .im-grid > :nth-child(4)')
            .findByRole('textbox')
            .type(5, { force: true })
        cy.get('.container > .im-grid > :nth-child(4)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/5 Peach/i).should('exist')
        cy.findByText(/5 Cereal/i).should('exist')
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

        /*
        //As a client -> Select the shipping info
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a warehouse page
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //As a client, manage info for the order
        cy.findByRole('button', { name: /your orders/i }).click({ force: true });
        cy.findByRole('button', { name: /shipping info/i }).click();
        //Select pickUp
        cy.get('#pickup').click()
        //Select a data for pickUp
        cy.get('.form-control').type("09/02/2022, 10:00 AM")
        //Confirm
        cy.findByRole('button', { name: /confirm/i }).click();
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);

        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a warehouse page
        cy.findByRole('textbox', { name: /email/i }).type('maria@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //As a client, manage info for the order
        cy.findByRole('button', { name: /your orders/i }).click({ force: true });
        cy.findByRole('button', { name: /shipping info/i }).click();
        //Select pickUp
        cy.get('#pickup').click()
        //Select a data for pickUp
        cy.get('.form-control').type("09/02/2022, 10:00 AM")
        //Confirm
        cy.findByRole('button', { name: /confirm/i }).click();
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);
        */

        //AS A FARMER -> CONFIRM THE ORDER
        //Login as a farmer
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Vado sulla conferma prodotti
        cy.findByRole('button', { name: /confirm products/i }).click({ force: true })
        //Confirm the order
        //cy.get(':nth-child(1) > :nth-child(4) > .im-input').clear().type('4')
        //cy.get(':nth-child(2) > :nth-child(4) > .im-input').clear().type('4')
        cy.get(':nth-child(3) > :nth-child(4) > .im-input').clear().type('0', { force: true })
        cy.get(':nth-child(4) > :nth-child(4) > .im-input').clear().type('0', { force: true })
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation ok')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //Alle nove del lunedi mattina gli ordini vengono messi in pending o confermati
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click({ force: true })
        cy.get('#setHour').click().type("12:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.wait(2500);


    })

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
    })

    //COSTRETTO A DOVER CONTROLLARE TUTTO NELLO STESSO TEST, IL CRONO ALTRIMENTI ROMPE TUTTOOOOOOOO!
    it('a shopEmployee should be able to view the pendingOrders (when the wallet must be recharged)', () => {

        //PENDING ORDER
        //Go to Pending Orders
        cy.findByRole('button', { name: /pending orders/i }).click({ force: true });
        //Check for Michele's order
        cy.get('tbody > :nth-child(1) > :nth-child(1)').should("exist").should("include.text", 'Michele Basilico')
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should("exist").should("include.text", '2.5')
        cy.get('tbody > :nth-child(1) > :nth-child(3)').should("exist").should("include.text", 'pending')
        cy.get('tbody > :nth-child(1) > :nth-child(4)')
            .findByRole('button', { name: /contact info/i }).should("exist")
        cy.findByRole('button', { name: /contact info/i }).click({ force: true })
        cy.get('.modal-body > :nth-child(1)').should("include.text", "User mail : michele@gmail.com")
        cy.get('.modal-body > :nth-child(2)').should("include.text", "Number : +39 123456789")
        cy.get('.modal-footer')
            .findByRole('button', { name: /close/i }).click({ force: true })
        cy.get('tbody > :nth-child(1) > :nth-child(5)')
            .findByRole('button', { name: /send a reminder/i }).should("exist")
        cy.findByRole('button', { name: /send a reminder/i }).click({ force: true })

        //Check for Maria's order
        cy.get('tbody > :nth-child(2) > :nth-child(1)').should("exist").should("include.text", 'Maria Basilico')
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should("exist").should("include.text", '27.5')
        cy.get('tbody > :nth-child(2) > :nth-child(3)').should("exist").should("include.text", 'pending')
        cy.get('tbody > :nth-child(2) > :nth-child(4)')
            .findByRole('button', { name: /contact info/i }).should("exist")
        cy.findByRole('button', { name: /contact info/i }).click({ force: true })
        cy.get('.modal-body > :nth-child(1)').should("include.text", "User mail : maria@gmail.com")
        cy.get('.modal-body > :nth-child(2)').should("include.text", "Number : +39 123456789")
        cy.get('.modal-footer')
            .findByRole('button', { name: /close/i }).click({ force: true })
        cy.get('tbody > :nth-child(2) > :nth-child(5)')
            .findByRole('button', { name: /send a reminder/i }).should("exist")
        cy.findByRole('button', { name: /send a reminder/i }).click({ force: true })

        //CONFIRMED ORDER
        //Check for Michele's order
        cy.findByText('Michele Basilico').should("not.exist")
        //Go back
        cy.get('.im-subNavbar > .im-button').click()
        //Go to Pending Orders
        cy.findByRole('button', { name: /check orders/i }).click({ force: true });
        //Insert the email and search the order
        cy.findByRole('textbox').type("michele@gmail.com")
        cy.findByRole('button', { name: /search/i }).click({ force: true });
        //Check for Michele's order
        cy.get('.over > :nth-child(2)').should("exist").should("include.text", '27')
        cy.get('.over > :nth-child(3)').should("exist").should("include.text", 'confirmed')

        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.clearCookies()
        cy.wait(1000)

        //CHECK NOTIFICATIONS ON MARIA'S PROFILE
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('maria@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByRole('button', { name: /personal mailbox/i }).click({ force: true });
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').click().type("12:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check pending order email
        cy.get(':nth-child(1) > :nth-child(5) > .im-button').click({ force: true })
        cy.get('.modal-title').should('include.text', 'pending order')
        cy.get('.modal-body').should('include.text', "Your order code").should('include.text', "is pending, top up your wallet!")
        cy.get('.modal-footer')
            .findByRole('button')
            .click()
        //Check reminder
        cy.get(':nth-child(2) > :nth-child(5) > .im-button').click({ force: true })
        cy.get('.modal-title').should('include.text', 'Reminder')
        cy.get('.modal-body').should('include.text', "That's a reminder from the shop employee: top up your wallet!")
        cy.get('.modal-footer')
            .findByRole('button')
            .click()
        //Check the amount to recharge is correct
        cy.get('.justify-content-center > :nth-child(7)').should('include.text', '27.5')
        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.clearCookies()
        cy.wait(1000)


        //CHECK NOTIFICATIONS ON Michele'S PROFILE
        /*
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.findByRole('button', { name: /personal mailbox/i }).click({ force: true });
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').click().type("12:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check removed product
        cy.get(':nth-child(1) > :nth-child(5) > .im-button').click({ force: true })
        cy.get('.modal-title').should('include.text', 'Product removed')
        cy.get('.modal-body').should('include.text', "removed from order code")
        cy.get('.modal-footer')
            .findByRole('button')
            .click()
        //Check pending order email
        cy.get(':nth-child(2) > :nth-child(5) > .im-button').click({ force: true })
        cy.get('.modal-title').should('include.text', 'pending order')
        cy.get('.modal-body').should('include.text', "Your order code").should('include.text', "is pending, top up your wallet!")
        cy.get('.modal-footer')
            .findByRole('button')
            .click()
        //Check the amount to recharge is correct
        cy.get('.justify-content-center > :nth-child(7)').should('include.text', '0')
        */

    })


})