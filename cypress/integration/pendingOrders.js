describe('pendingOrders', () => {

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

        //Add new order
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Steak 3$
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('50')

        //click issue order button
        cy.get('.ml-3 > :nth-child(2) > .spg-button').click()

        //Product hand-out
        cy.get(':nth-child(4) > :nth-child(2) > .se-button').click()
        cy.get('.form-control').type('michele@gmail.com')
        cy.get('.card-body > .spg-button').click()
        cy.get('.card-body > .spg-button').click()
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
    })


    it('a shopEmployee should be able to view pending orders', () => {

        //Click Pending Orders
        cy.get(':nth-child(3) > :nth-child(1) > .se-button').click()
        cy.wait(1000)
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('exist')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('exist')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(3)').should('exist')

        //Check about id(ever change in the DB), price and status
        //cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('include.text', 'id : 27')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('include.text', 'price : 150')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(3)').should('include.text', 'status : pending')

    })

})