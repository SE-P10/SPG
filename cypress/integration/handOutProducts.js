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
        //Add new order
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michelebasilico@gmail.com")
        //Select a product
        cy.get(':nth-child(2) > .form-group > .form-check > .form-check-input').check();
        //Type a wrong number of product 
        cy.findByRole('spinbutton').clear().type('2').trigger('change');
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
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
        cy.findByRole('button', { name: /handout/i }).click();

    })
    afterEach(() => {
        //Logout
        cy.findByRole('link', { name: /logout/i }).click()
        cy.clearCookies()
    })
    after(() => {
        //clear Db
        cy.request('DELETE', 'http://localhost:3001/api/clients/michelebasilico@gmail.com')
    })

    it('a shopEmployee should be able to view a right order price', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        //Click on search button
        cy.findByRole('button', {  name: /search/i}).click()
        //Assertion on price
        cy.get('.below.col > :nth-child(1) > :nth-child(2)').should('include.text','4.6')
        
    })

    it('a shopEmployee should be able to hand out a client order (by entering not registered user)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('topogigio@gmail.it')
        //Click on search button
        cy.findByRole('button', {  name: /search/i}).click()
        //Assertion on alert
        cy.get('.fade').should('include.text','No orders found')
        
    })
/*
    it('a shopEmployee should be able to hand out a client order (by entering user without order)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('topogigio@gmail.it')
        //Click on search button
        cy.findByRole('button', {  name: /search/i}).click()
        //Assertion on alert
        cy.get('.fade').should('include.text','No orders found')
        
    })
*/
    it('a shopEmployee should be able to hand out a client order (by entering correct email and order)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        //Click on search button
        cy.findByRole('button', {  name: /search/i}).click()
        //Status booked
        cy.get('.below.col > :nth-child(1) > :nth-child(3)').should('include.text','booked')
        //Click on hand out button
        cy.findByRole('button', {  name: /hand out/i}).click()
        //Check Alert
        cy.findByRole('alert').should('include.text', 'Order hands out correctly!')
        //Check the order
        cy.findByRole('button', {  name: /check orders/i}).click()
        cy.findByRole('textbox').type('michelebasilico@gmail.com')
        cy.findByRole('button', {  name: /search/i}).click()
        cy.findByText(/status : handout/i).should('exist')

        
    })
/*
    it('a shopEmployee should see the correct amount of client wallet after a hand out', () => {
        //TODO
        
    })
    it('a shopEmployee should be able to hand out a client order (by entering correct email and order but without money)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michelebasilico2@gmail.com')
        //Click on search button
        cy.findByRole('button', {  name: /search/i}).click()
        //Check???
        cy.get('.below.col > :nth-child(1) > :nth-child(3)').should('include.text','hand out')
        
    })
*/
})