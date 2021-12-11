describe('confirmOrderByFarmer', () => {

    before(() => {
        // runs before each test in the block
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //Go to SignUp Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /Sign up/i }).click();

        //Iscrivo un client
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Popup is shown
        cy.findByText(/registration was successful/i).should('exist')
        //redirect to login
        cy.get('.modal-footer > .spg-button').click()
        //Login as a ShopEmployee -> New User Order 
        
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Torno al menu utente
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(1) > .text-black > .bi').click()
        //Vado sulla conferma prodotti
        cy.findByRole('button', { name: /confirm products/i })
    })
    afterEach(() => {
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()
    })

    it('a farmer should not be able to confirm a product between Monday at 09:00 and Sunday at 23:00 ', () => {
        //Cambio data per non rientrare in questa categoria
        cy.findByRole('button', { name: /set/i }).click()
        //Come lo piglio sempre lo stesso giorno??????
        cy.findByRole('button', { name: /13 dicembre 2021/i }).click()
        cy.findByPlaceholderText('Set hour')
    })

})