describe('enterNewClientOrder', () => {

    before(() => {
        //runs once before all tests in the block -> Add new Client
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /username/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register a client/i }).click();
        //Insert the Client Info
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michelebasilico@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Logout
        cy.findByRole('link', { name: /logout/i }).click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /username/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /topup a wallet/i }).click()

    })
    afterEach(() => {
        //Logout
        cy.findByRole('link', { name: /logout/i }).click()
        cy.clearCookies()
    })
    after(() => {
        //clear Db
        //Sconsigliato pulire il db nella after ma per ora ok
        cy.request('DELETE', 'http://localhost:3001/api/clients/michelebasilico@gmail.com')
        //cy.request('DELETE', 'api/users/:michelebasilico@gmail.com')
    })


    it('a shopEmployee should be able to top up a client wallet (by entering not registered user)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('topogigio@gmail.it')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Assertion on alert
        cy.get('.fade').should('include.text', 'No user found')
        //Close Alert
        cy.findByText(/×/i).click()

    })

    //Funziona solo col db pulito
    it('a shopEmployee should be able to top up a client wallet (by entering correct email)', () => {
        //Enter email
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Empty wallet
        cy.get('[disabled=""]').should('have.value', '0')
        //type a number to recharge
        cy.findByRole('spinbutton').clear().type('20');
        //click on recharge button
        cy.findByRole('button', { name: /recharge the wallet/i }).click()
        //Assertion
        cy.findByRole('alert').should('include.text', 'successfully recharged your wallet')
        //Close Alert
        cy.findByText(/×/i).click()
        //Click on topup button
        cy.findByRole('button', { name: /topup a wallet/i }).click()
        //Enter email
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Check new wallet credit
        cy.get('[disabled=""]').should('have.value', '20')
    })

    it('a shopEmployee should be able to top up a client wallet (by entering negative amount)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Empty wallet
        cy.get().should('have.text', '20')
        //type a number to recharge
        cy.findByRole('spinbutton').clear().type('-20');
        //click on recharge button
        cy.findByRole('button', { name: /recharge the wallet/i }).click()
        //check the alert
        cy.getByRole('alert').should('include.text', 'The amount must be greater than 0.')
        //ToDO -> Check on the server
    })

    it('a shopEmployee should be able to top up a client wallet (by entering wrong input)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //type a number to recharge
        cy.findByRole('spinbutton').clear().type('ciao');
        //click on 
        cy.findByRole('button', { name: /recharge the wallet/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'The amount must be greater than 0.')
    })

})