describe('addProductsToBasket_Client', () => {

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
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        //Popup is shown
        cy.findByText(/registration was successful/i).should('exist')

        //redirect to login
        //NON FUNZIONA
        //cy.findByRole('button', { name: /yes/i }).click({ force: true });
        //Torno al menu utente



    })

    beforeEach(() => {
        //redirect to login
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to make an order
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //You can purchase an order from Saturday at 09:00 and Sunday at 23:00
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
    })

    it('a client should be able to view the product added in the basket entering item rigtly', () => {

        //Aggiungo due banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });


        //Check on basket
        cy.findByText(/2 Banana/i).should('exist')

    })

    it('a client should be able to delete a product added in the basket', () => {

        //Aggiungo due banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Check on basket
        cy.findByText(/2 Banana/i).should('exist')

        //Delete the product
        cy.findByRole('button', { name: /delete/i }).click({ force: true });
        //Check on basket
        cy.findByText(/2 Banana/i).should('not.exist')

        //NOW ADDING MORE OBJECTS
        //Add two bananas
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Check on basket
        cy.findByText(/2 Banana/i).should('exist')
        //Add two apples
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('button', { name: /add/i }).click({ force: true });

        //Check on basket    
        cy.findByText(/2 Banana/i).should('exist')
        cy.findByText(/2 Melon/i).should('exist')

        //Delete the product(Melon)
        cy.get('.im-basket > .card-body > .card-text > :nth-child(1)')
            .findByRole('button', { name: /delete/i }).click({ force: true });
        //Check on basket
        cy.findByText(/2 Banana/i).should('exist')
        cy.findByText(/2 Melon/i).should('not.exist')

    })

    it('a client should be able to modify a product added in the basket', () => {

        //Aggiungo due banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Check on basket
        cy.findByText(/2 Banana/i).should('exist')

        //Get 1kg of product
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(1, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /modify/i }).click({ force: true });
        //Check on basket
        cy.findByText(/1 Banana/i).should('exist')

    })

    it('a client should be able to view the right price after added product in the basket', () => {

        //Aggiungo due banane(3 euro al kg)
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });

        //Aggiungo 5kg di mele(4 euro al kg)
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('textbox')
            .type(5, { force: true })
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('button', { name: /add/i }).click({ force: true });


        //Check on basket
        cy.get('.im-text').should('include.text', "Total: 20")

    })

    it('a client should be able to view the right available quantity after the product adding to the basket', () => {

        //Aggiungo due banane(3 euro al kg)
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(2, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });

        //Aggiungo 5kg di mele(4 euro al kg)
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('textbox')
            .type(5, { force: true })
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('button', { name: /add/i }).click({ force: true });


        //Check the quantity remained
        cy.get(':nth-child(1) > .card-body > .card-text > :nth-child(3) > .text-end')
            .should("include.text", "98 left of 100 available")
        cy.get(':nth-child(2) > .card-body > .card-text > :nth-child(3) > .text-end')
            .should("include.text", "95 left of 100 available")

    })


})