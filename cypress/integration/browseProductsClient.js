describe('signUp_Client', () => {

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
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Add new zucchinies
        cy.get('.list > :nth-child(13)')
            .findByRole('checkbox')
            .click()
        cy.get('.form-group > :nth-child(2)').clear().type(150)
        cy.get('.form-group > :nth-child(3)').clear().type(0.9)
        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.findByText(/×/i).click()
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        //cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')
        //Torno al menu utente
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.get('#username').type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(1) > .text-black > .bi').click()
        //Vado sulla ricerca prodotti
        cy.findByText(/browse products/i).click()
    })
    afterEach(() => {
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()
    })

    it('a client should be able to search a product', () => {

        //CORRECT SEARCHING
        //Search a product
        cy.get('#search').type('Chicken')
        //Checking the component exist
        cy.get('.list > :nth-child(2)').should('exist')

        //WRONG SEARCHING
        //Search a product
        cy.get('#search').clear().type('Chickens')
        //Checking the component exist
        cy.findByText(/chicken/i).should('not.exist')

        //ANY ELEMENT IS SHOWN && CHECK UPPER/LOW_CASE
        cy.get('#search').clear().type('ch')
        cy.findByText(/cheese/i).should('exist')
        cy.findByText(/pistachio/i).should('exist')
        cy.findByText(/zucchini/i).should('exist')
        cy.findByText(/chicken/i).should('exist')
        cy.findByText(/peach/i).should('exist')


    })

    it('a client should be able to view the rigth quantity(After a farmer update)', () => {
        //1 SEARCH
        //Search a product
        cy.get('#search').type('Zucchini')
        //Checking the component exist
        cy.get('.list > :nth-child(2)').should('exist')
        cy.get('.list > :nth-child(2) > .below > :nth-child(3)').should('include.text', '150')
    })
})