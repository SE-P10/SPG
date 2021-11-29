describe('signUp_Client', () => {

    before(() => {

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

    })

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a Farmer
        cy.findByRole('textbox', { name: /email/i }).type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
    })


    it('a farmer should be able to switch from menu to functionality page', () => {

        //Check
        cy.findByText('Update Availability').should('exist')
        //Return to menu
        cy.get('.spg-button').click()
        //Check
        cy.findByText('Update Products Availability').should('exist')

    })

    it('a farmer should be able to update the available quantity of products', () => {

        //Add new bananas
        cy.get('.list > :nth-child(1)')
            .findByRole('checkbox')
            .click()
        //Decrement expired apple
        cy.get('.list > :nth-child(2)')
            .findByRole('checkbox')
            .click()
        cy.get(':nth-child(1) > .form-group > :nth-child(2)').clear().type(150)
        cy.get(':nth-child(1) > .form-group > :nth-child(3)').clear().type(2.4)
        cy.get(':nth-child(2) > .form-group > :nth-child(2)').clear().type(50)
        cy.get(':nth-child(2) > .form-group > :nth-child(3)').clear().type(2.3)

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', "150")
        cy.get('.list > :nth-child(2) > :nth-child(2)').should('include.text', "50")
    })

    it('a farmer should not be able to enter letter', () => {

        //Add new bananas
        cy.get('.list > :nth-child(1)')
            .findByRole('checkbox')
            .click()
        cy.get('.form-group > :nth-child(2)').type("Caramelle")
        cy.get('.form-group > :nth-child(3)').type('Cioccolata')
        //Click button
        cy.get('.se-button').click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'you have negative quantities and/or negative price.')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        cy.get('.spg-button').click()
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', "150")

    })

    it('a farmer should not be able to enter negative number', () => {

        //Add new bananas
        cy.get('.list > :nth-child(1)')
            .findByRole('checkbox')
            .click()
        cy.get('.form-group > :nth-child(2)').type("-25")
        cy.get('.form-group > :nth-child(3)').type('-85')
        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'you have negative quantities and/or negative price.')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        cy.get('.spg-button').click()
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', "150")
    })

    it('a farmer should not be able to issue an order without any change', () => {

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', '×Close alert you have not updated any  items. ')
        //Close Alert
        cy.findByText(/×/i).click()

        //The same test but with product just selected
        //Select some product
        cy.get(':nth-child(2) > .form-group > .form-check > #CheckBoxItem').click()
        cy.get(':nth-child(5) > .form-group > .form-check > #CheckBoxItem').click()
        cy.get(':nth-child(8) > .form-group > .form-check > #CheckBoxItem').click()
        cy.get(':nth-child(12) > .form-group > .form-check > #CheckBoxItem').click()
        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', '×Close alert you have negative quantities and/or negative price.')
        //Close Alert
        cy.findByText(/×/i).click()

    })
    //CONTROLLO NON ESEGUITO
    /*
        it('a farmer should not be able to overcame a max fixed quantity of products ', () => {
    
            //Select some product
            cy.get('.list > :nth-child(1)')
                .findByRole('checkbox')
                .click()
            cy.get('.form-group > :nth-child(2)').clear().type("999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999")
            cy.get('.form-group > :nth-child(3)').clear().type('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
            //Click on issue order
            cy.findByRole('button', { name: /Issue Order/i }).click()
            //Check alert
            cy.findByRole('alert').should('include.text', 'yuo have exceed the max value of product')
            //Close Alert
            cy.findByText(/×/i).click()
    
            //Now let's check the quantities
            cy.findByRole('button', { name: /update products availability/i }).should('include.text', "150")
        })
    
    */
})