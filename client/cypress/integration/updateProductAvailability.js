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
        cy.findByRole('button', { name: /update products availability/i }).click({ force: true })
    })

/*
    it('a farmer should be able to switch from menu to functionality page', () => {

        //Check
        cy.findByText('Update Availability').should('exist')
        //Return to menu
        cy.get('.spg-button').click()
        //Check
        cy.findByText('Update Products Availability').should('exist')

    })
*/
    it('a farmer should be able to update the available quantity of products(from Friday at 18:00 to Saturday at 09:00)', () => {

        //Change date for managing updating(from Friday at 18:00 to Saturday at 09:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        //Friday at 18:30
        cy.get('.react-calendar__month-view__days > :nth-child(12)').click()
        cy.get('#setHour').click().type("19:00")
        cy.get('.d-flex > .btn').click()

        //Add new zucchinies
        cy.get(':nth-child(13) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("150")
        cy.get('[value="0.9"]').clear().type("0.9")
        //Click on first update
        cy.get('.modal-footer > .im-button').click()
        //Remove some Aubergines
        cy.get(':nth-child(14) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("50")
        cy.get('[value="0.8"]').clear().type("0.8")
        //Click on first update
        cy.get('.modal-footer > .im-button').click()

        //Second Update
        cy.get('.below.im-button').click()
        cy.wait(1000)
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //Now let's check the quantities
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.get('.list > :nth-child(13) > :nth-child(2)').should('include.text', "150")
        cy.get('.list > :nth-child(14) > :nth-child(2)').should('include.text', "50")

        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.clearCookies()
    })

    it('a farmer should  be able to update the available quantity of products from Friday at 18:00 to Saturday at 09:00', () => {

        //Change date for managing updating(from Friday at 18:00 to Saturday at 09:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(12)').click()
        //Set the date
        cy.get('.d-flex > .btn').click()

        for (let i = 0; i < 30; i++) {
            let time
            let hour = 18
            if (i >= 12) {
                if (i === 12) {
                    hour = 0
                }
                time = "0" + hour
            }
            else
                time = String(hour)


            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()


            if (i % 2 == 0)
                cy.get('#setHour').click().type(time + ":00")
            else {
                cy.get('#setHour').click().type(time + ":30")
                hour++;
            }

            //Set the date
            cy.get('.d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can Update Availability from Friday at 18:00 to Saturday at 09:00').should('not.exist')
        }

    })

    it('a farmer should not be able to update the available quantity of products(from Saturday at 09:00 to Friday at 18:00)', () => {

        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        //Set the date
        cy.get('.d-flex > .btn').click()

        for (let i = 12; i < 19; i++) {
            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click()
            if (i === 18) {
                cy.get('#setHour').click().type("17:30")
            } else {
                cy.get('#setHour').click().type("09:00")
            }
            //Set the date
            cy.get('.d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can Update Availability from Friday at 18:00 to Saturday at 09:00').should('exist')
        }

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
/*
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