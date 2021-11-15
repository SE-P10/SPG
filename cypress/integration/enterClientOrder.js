describe('enterNewClientOrder', () => {

    //TODO -> Clean every information added during the tests

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
        //Click a button to add a new order
        cy.findByRole('button', { name: /new order/i }).click();
        
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

    it('a shopEmployee should be able to add a new order of a client (by entering not registered user) ', () => {
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("carletto@gmail.com")
        //Check a product
        cy.get(':nth-child(1) > .form-group > .form-check > .form-check-input').check();
        //Add a quantity for the product -> Cypress works in the browser and the test cose is evaluated inside the browser.
        //Anything that is not accessible in Javascript is olso likely not accessible to Cypress. 
        //Using the up/down arrows of the number input is a browser implementation and would require native evente support for Cypress
        //to implement this correctly
        //When the up/down arrows are clicked, a change evente is triggered, so we could essentially test the application's behavior whent the
        //up/down arrow are clicked using the .trigger() command
        //cy.findByRole('spinbutton').clear().type('2').trigger('change');
        //We can also type the up/down press on keyboard
        cy.findByRole('spinbutton').type('{uparrow}').type('{uparrow}')
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear aler
        cy.findByRole('alert').should('include.text', 'User not registered')

    })

    it('a shopEmployee should be able to add a new order of a client (by entering no products) ', () => {
        //Click a button to add a new order
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michi@gmail.com")
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', '')
    })

    it('a shopEmployee should be able to add a new order of a client (by entering n. of product not avaiable) ', () => {
        //Click a button to add a new order
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michi@gmail.com")
        //Select a product
        cy.get(':nth-child(1) > .form-group > .form-check > .form-check-input').check();
        //Type a wrong number of product 
        cy.findByRole('spinbutton').clear().type('4').trigger('change');
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', '')
    })

    it('a shopEmployee should be able to add a new order of a client (by entering negative n. of product) ', () => {
        //Click a button to add a new order
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michi@gmail.com")
        //Select a product
        cy.get(':nth-child(1) > .form-group > .form-check > .form-check-input').check();
        //Type a wrong number of product 
        cy.findByRole('spinbutton').clear().type('-2').trigger('change');
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', '')
    })

    it('a shopEmployee should be able to add a new order of a client (by entering correct info) ', () => {
        //Click a button to add a new order
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michelebasilico1@gmail.com")
        //Select a product
        cy.get(':nth-child(1) > .form-group > .form-check > .form-check-input').check();
        //Type a wrong number of product 
        cy.findByRole('spinbutton').clear().type('2').trigger('change');
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', '')
    })


})