describe('addProductsToBasket', () => {

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
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to make an order
        cy.findByRole('button', { name: /new order/i }).click();

    })

    it('a client should be able to view the product added in the basket entering item rigtly', () => {

        //Aggiungo due ananas
        cy.get('.list > :nth-child(1)')
            .findByRole('textbox')
            .type(2)
        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.findByText(/Ananas Q: 2/i).should('exist')

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
        cy.get('form.below > .form-control').select('Chicken')
        //Checking the component exist
        cy.get('.list > .below').should('exist')
        cy.get('.list > .below > :nth-child(2)').should('include.text', 'Chicken')

        //Remove the filter
        cy.get('.col-sm-8 > .spg-button').click()

        //FARMER FILTER
        //Click filter button
        cy.get('.col-sm-8 > .spg-button').click()
        cy.get(':nth-child(4) > .form-control').select('PaoloBianchi')
        //Checking the component exist

        for (let i = 1; i <= 50; i++) {
            cy.get('.list > :nth-child(' + i + ')')
                .should('exist')
        }

        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', 'Ananas')

        //Remove the filter
        cy.get('.col-sm-8 > .spg-button')

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
        cy.findByRole('button', { name: /issue order/i }).click()
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

        //Aggiungo due ananas
        cy.get('.list > :nth-child(1)')
            .findByRole('textbox')
            .type(-2)
        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should not be able to issue an order with product added entered a text', () => {

        //Aggiungo l'ananas con quantita negativa
        //Aggiungo  ananas
        cy.get('.list > :nth-child(1)')
            .findByRole('textbox')
            .type('bellazii')
        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should not be able to issue an order with selected product entering 0 as a quantity ', () => {

        //Aggiungo l'ananas con quantita negativa
        //Aggiungo due ananas
        cy.get('.list > :nth-child(1)')
            .findByRole('textbox')
            .type(0)
        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()
        //Alert is shown
        cy.findByRole('alert').should('include.text', "Wrong quantity")
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a client should be able to delete the product added in the basket', () => {

        //Aggiungo due ananas
        cy.get('.list > :nth-child(1)')
            .findByRole('textbox')
            .type(2)
        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.findByText(/Ananas Q: 2/i).should('exist')

        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.findByText(/Ananas Q: 2/i).should('not.exist')

    })

    it('a client should be able to issue an order', () => {

        //Aggiungo due ananas
        cy.get('.list > :nth-child(1)')
            .findByRole('textbox')
            .type(2)
        cy.get('.list > :nth-child(1)')
            .findByRole('button')
            .click()

        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', "Request sent correctly!")
        //Close Alert
        cy.findByText(/×/i).click()

        //Check
        cy.findByRole('button', { name: /your order/i }).click()
        cy.get('.cont > .justify-content-center > :nth-child(1)').should('exist')


        
    })

})