describe('viewProducts', () => {
    it( "a user should view a products list", () => {
        //User click on login button
        cy.visit('http://localhost:3000');
        cy.findByRole('link', {  name: /login/i}).click();
        //Login
        cy.findByRole('textbox', {  name: /username/i}).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', {  name: /login/i}).click();
        //Click on Browse Products
        cy.findByRole('button', {  name: /browse products/i}).click();
        //User views a products list  -> TODO: Redo using a for cycle and prebuilded data
        cy.get(':nth-child(1) > h4').should('have.text', ' Name ')
        cy.get(':nth-child(3) > .container > :nth-child(3) > :nth-child(1)').should('have.text', ' banana')
        cy.get(':nth-child(4) > :nth-child(1)').should('have.text', ' apple')
        cy.get(':nth-child(5) > :nth-child(1)').should('have.text', ' melon')

        cy.get(':nth-child(2) > h4').should('have.text', ' Quantity')
        cy.get(':nth-child(3) > :nth-child(2)').should('have.text', ' 3')
        cy.get(':nth-child(4) > :nth-child(2)').should('have.text', ' 4')
        cy.get(':nth-child(5) > :nth-child(2)').should('have.text', ' 3')

        cy.get(':nth-child(3) > h4').should('have.text', ' Price ')
        cy.get(':nth-child(3) > :nth-child(3)').should('have.text', '2.4')
        cy.get(':nth-child(4) > :nth-child(3)').should('have.text', '2.3')
        cy.get(':nth-child(5) > :nth-child(3)').should('have.text', '2.4')

        //User chooses a product in the list?

    })
})