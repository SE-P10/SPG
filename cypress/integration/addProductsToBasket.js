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
        //Vado sugli ordini
        cy.get(':nth-child(2) > .se-button').click()
    })

    afterEach(() => {
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()
    })

    it('a client should be able to view the product added in the basket entering item rigtly', () => {

        //Aggiungo due mele
        cy.get('#\\32').type(2)
        cy.get('.list > :nth-child(2) > .btn').click()

        //Check on basket
        cy.findByText(/ananas q: 3/i)
        //cy.findByText(/apple q: 2/i)

    })

    it('a client should be able to search a product', () => {

        //CORRECT SEARCHING
        //Search a product
        cy.get('#search').type('Chicken')
        //Checking the component exist
        cy.get('.list > .below').should('exist')

        //WRONG SEARCHING
        //Search a product
        cy.get('#search').clear().type('Chickens')
        //Checking the component exist
        cy.get('.list > .below').should('not.exist')

    })
    it('a client should be able to use a filter', () => {

        //Click filter button
        cy.get('.col-sm-8 > .spg-button').click()

        //TYPE FILTER
        cy.get('.below > .form-control').select('Chicken')
        //Checking the component exist
        cy.get('.list > .below').should('exist')
        cy.get('.list > .below > :nth-child(2)').should('include.text', 'Chicken')

        //Remove the filter
        cy.get('.col-sm-8 > :nth-child(3)').click()
        cy.get('.col-sm-8 > :nth-child(2)').click()

        //FARMER FILTER
        //Click filter button
        cy.get('.col-sm-8 > .spg-button').click()
        cy.get(':nth-child(5) > .form-control').select('PaoloBianchi')
        //Checking the component exist

        for (let i = 1; i <= 50; i++) {
            cy.get('.list > :nth-child(' + i + ')')
                .should('exist')
        }

        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', 'Ananas')

        //Remove the filter
        cy.get('.col-sm-8 > :nth-child(3)').click()
        cy.get('.col-sm-8 > :nth-child(2)').click()

        //FARMER & TYPE FILTER
        //DEVO AGGIUNGERE UN CHICKEN DI UN ALTRO FARMER
        /*cy.get('.col-sm-8 > .spg-button').click()
        cy.get('.below > .form-control').select('Chicken')
        cy.get(':nth-child(5) > .form-control').select('PaoloBianchi')
        //Checking the length of the list(Should be just 1)

        cy.get('.list > :nth-child(1)')
            .should('exist')
        cy.get('.list > :nth-child(2)')
            .should('not.exist')

        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', 'Chicken')*/

    })

    it('a client should not be able to issue an order with no product added to basket', () => {

        //Aggiungo l'ananas
        //cy.get(':nth-child(1) > .btn')

        //Mando l'ordine senza avere aggiunto niente
        cy.get('.ml-3 > :nth-child(2) > .spg-button').click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Can't issue an order without items.")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should not be able to issue an order with product added but not its quantity', () => {

        //Aggiungo l'ananas senza modificare il contenuto
        cy.get(':nth-child(1) > .btn').click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should not be able to issue an order with product added in negative quantity', () => {

        //Aggiungo l'ananas con quantita negativa
        cy.get('#\\31 9').type('-80')
        cy.get(':nth-child(1) > .btn').click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should not be able to issue an order with product added entered a text', () => {

        //Aggiungo l'ananas con quantita negativa
        cy.get('#\\31 9').type('bellaZii')
        cy.get(':nth-child(1) > .btn').click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should not be able to issue an order with selected product entering 0 as a quantity ', () => {

        //Aggiungo l'ananas con quantita negativa
        cy.get('#\\31 9').type('0')
        cy.get(':nth-child(1) > .btn').click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should be able to view the product added in the basket entering item rigtly', () => {

        //Aggiungo 3 ananas 
        cy.findAllByRole('textbox')[1].type(3)
        cy.get(':nth-child(1) > .btn').click()
        //Aggiungo due mele
        //cy.get('#\\32').type(2)
        //cy.get('.list > :nth-child(2) > .btn').click()

        //Check on basket
        cy.findByText(/ananas q: 3/i)
        //cy.findByText(/apple q: 2/i)

    })

    it('a client should be able to issue an order', () => {

        //Aggiungo 3 ananas 
        cy.get('#\\31 9').type(3)
        cy.get(':nth-child(1) > .btn').click()
        //Aggiungo due mele
        //cy.get('#\\32').type(2)
        //cy.get('.list > :nth-child(2) > .btn').click()

        //Check on basket
        cy.findByText(/ananas q: 3/i)
        //cy.findByText(/apple q: 2/i)

        cy.get('.ml-3 > :nth-child(2) > .spg-button').click()

    })

})