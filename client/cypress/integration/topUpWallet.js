describe('topUpWallet_ShopEmployee', () => {


    before(() => {
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //As shopEmployee add new client

        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
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
        cy.findByRole('button', { name: /register/i }).click({ force: true });

        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);
        cy.clearCookies()
    })


    beforeEach(() => {

        //runs once before all tests in the block -> Add new Client
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /topup a wallet/i }).click({ force: true })
    })

    //You can top up wallets from Saturday at 09:00 to Monday at 18:00
/*
    it('a shopEmployee should not be able to top up a client wallet (from Monday at 18:00 to Saturday at 09:00)', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(8)').click({ force: true })
        cy.get('#setHour').click().type("18:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('You can top up wallets from Saturday at 09:00 to Monday at 18:00').should('exist')

        for (let i = 9; i < 14; i++) {
            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click({ force: true })
            if (i === 13) {
                //On Saturday just to 09:00 am
                cy.get('#setHour').click().type("08:30")
            }
            //Set the date
            cy.get('.d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can top up wallets from Saturday at 09:00 to Monday at 18:00').should('exist')
        }

    })
    //You can top up wallets from Saturday at 09:00 to Monday at 18:00

    it('a shopEmployee should be able to top up a client wallet (from Saturday at 09:00 to Monday at 18:00 )', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('You can top up wallets from Saturday at 09:00 to Monday at 18:00').should('not.exist')

        for (let i = 14; i < 16; i++) {
            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click({ force: true })
            //Set the date
            cy.get('.d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can top up wallets from Saturday at 09:00 to Monday at 18:00').should('not.exist')
        }

    })

    it('a shopEmployee should not be able to top up a client wallet (by entering not registered user)', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Enter wrong email
        cy.findByRole('textbox').type('topogigio@gmail.it')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'No user found')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })

    it('a shopEmployee should not be able to top up a client wallet (by entering negative amount)', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Enter right email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Empty wallet
        cy.get('[disabled=""]').should('have.value', '0')
        //type a number to recharge
        cy.findByRole('spinbutton').clear()
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        cy.findByRole('spinbutton').type('-20');

        //click on recharge button
        cy.findByRole('button', { name: /recharge the wallet/i }).click()
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Wrong quantity')


    })

    it('a shopEmployee should be able to top up a client wallet (by entering wrong input)', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Enter wrong email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //type a number to recharge
        cy.findByRole('spinbutton').clear().type('ciao');
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //click on 
        cy.findByRole('button', { name: /recharge the wallet/i }).click()
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Wrong quantity')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
    })

    it('a shopEmployee should be able to top up a client wallet (by entering 0)', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Enter wrong email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //type a number to recharge
        cy.findByRole('spinbutton').clear()
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        cy.findByRole('spinbutton').type('0');
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //click on 
        cy.findByRole('button', { name: /recharge the wallet/i }).click()
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Wrong quantity')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
    })
*/
    it('a wallet should be updated after a recharge by a ShopEmployee', () => {

        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Enter right email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Empty wallet
        cy.get('[disabled=""]').should('have.value', '0')
        //type a number to recharge
        cy.findByRole('spinbutton').clear()
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        cy.findByRole('spinbutton').type('100');

        //click on recharge button
        cy.findByRole('button', { name: /recharge the wallet/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'successfully recharged your wallet')

        //Click on topup button
        cy.findByRole('button', { name: /topup a wallet/i }).click({ force: true })
        //Enter email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Check new wallet credit
        cy.get('[disabled=""]').should('have.value', '100')
    })


})