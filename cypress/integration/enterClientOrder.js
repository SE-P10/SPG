describe('enterNewClientOrder', () => {

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
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /new order/i }).click();

    })

    it('a shopEmployee should be able to add a new order of a client (by entering not registered user) ', () => {
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("carletto@gmail.com")
        //Add an element to basket
        //Steak 3$
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('5')
        
        //click issue order button
        cy.get('.ml-3 > :nth-child(2) > .spg-button').click()
        //Should be appeared an alert
        cy.findByRole('alert').should('include.text', 'Invalid user')
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server

    })

    it('a shopEmployee should be able to add a new order of a client (by entering no products) ', () => {
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', "Can't issue an order without items")
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server

    })

    it('a shopEmployee should be able to add a new order of a client (by entering n. of product not available) ', () => {
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Type a wrong number of product 
        //Steak 3$
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('570')
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', 'You are trying to order more than the quantity available')
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server

    })

    it('a shopEmployee should be able to add a new order of a client (by entering negative n. of product) ', () => {
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Add a negative amount of products
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo -50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('-50')
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', 'Quantity must be greater than 0')
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server

    })

    it('a shopEmployee should be able to add a new order of a client (by entering correct info) ', () => {
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Add products
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('5')
        //click issue order button
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly!')
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server
    })


})