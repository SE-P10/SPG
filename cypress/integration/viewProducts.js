describe('viewProducts', () => {

    before(() => {
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
        cy.get('#formGridEmail').type('utenteprova2@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Logout
        cy.findByRole('link', { name: /logout/i }).click()
        cy.clearCookies()

        cy.request('DELETE', 'http://localhost:3001/api/clients/utenteprova2@gmail.com')
    })

    it("a user should view a products list", () => {
        //User click on login button
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login
        cy.findByRole('textbox', { name: /username/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on Browse Products
        cy.findByRole('button', { name: /browse products/i }).click();
        //User views a products list  -> TODO: Redo using a for cycle and prebuilded data
        cy.get(':nth-child(1) > h4').should('include.text', 'Name')
        cy.get(':nth-child(3) > .container > :nth-child(3) > :nth-child(1)').should('include.text', 'banana')
        cy.get(':nth-child(4) > :nth-child(1)').should('include.text', 'apple')
        cy.get(':nth-child(5) > :nth-child(1)').should('include.text', 'melon')

        cy.get(':nth-child(2) > h4').should('include.text', 'Quantity')
        /* cy.get(':nth-child(3) > :nth-child(2)').should('include.text', ' 3')
         cy.get(':nth-child(4) > :nth-child(2)').should('include.text', ' 4')
         cy.get(':nth-child(5) > :nth-child(2)').should('include.text', ' 3')
 */
        cy.get(':nth-child(3) > h4').should('include.text', ' Price ')
        cy.get(':nth-child(3) > :nth-child(3)').should('include.text', '2.4')
        cy.get(':nth-child(4) > :nth-child(3)').should('include.text', '2.3')
        cy.get(':nth-child(5) > :nth-child(3)').should('include.text', '2.4')

        //User chooses a product in the list?

    })
})