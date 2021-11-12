describe('viewProducts', () => {
    it( "a user should view a products list", () => {
        //User click on login button
        cy.visit('http://localhost:3000');
        cy.findByRole('link', {  name: /login/i}).click();
        //Login
        cy.findByRole('textbox', {  name: /username/i}).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('$2b$10$OMHdOZ.PATpbMoaDz5013edi5QCTEFgpRv7Vn8OyDHQNN/4KXUKdi');
        cy.findByRole('button', {  name: /login/i}).click();
        //User views a products list
        
        //User chooses a product in the list

    })
})