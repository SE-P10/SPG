describe('updateProductAvaialbility_Farmer', () => {

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
        cy.get('[value="0.3"]').clear().type("0.3")
        //Click on first update
        cy.get('.modal-footer > .im-button').click()
        //Remove some Aubergines
        cy.get(':nth-child(14) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("50")
        cy.get('[value="0.9"]').clear().type("0.9")
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

    })

    it('a farmer should be able to update the available quantity of products from Wednesday at 09:00 to Saturday at 08:59', () => {

        //Change date for managing updating(from Wednesday at 09:00 to Saturday at 08:59)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(10)').click()
        cy.get('#setHour').click().type("09:05")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('You can Update Availability from Wednesday at 09:00 to Saturday at 08:59').should('not.exist')

        for (let i = 11; i < 14; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click({ force: true })
            if (i === 13) {
                cy.get('#setHour').click().type("08:55")
            }
            //Set the date
            cy.get('.d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can Update Availability from Wednesday at 09:00 to Saturday at 08:59').should('not.exist')
        }

    })


    it('a farmer should not be able to update the available quantity of products(from Saturday at 08:59 to Wednesday at 09:00)', () => {

        //Change date for managing updating(from Wednesday at 09:00 to Saturday at 08:59)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:05")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('You can Update Availability from Wednesday at 09:00 to Saturday at 08:59').should('exist')

        for (let i = 14; i < 17; i++) {
            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click({ force: true })
            //Set the date
            cy.get('.d-flex > .btn').click()

            //Check it's not possible to update any product
            cy.findByText('You can Update Availability from Wednesday at 09:00 to Saturday at 08:59').should('exist')
        }

    })

    //AD ORA NON VIENE FATTO IL CONTROLLO

    it('a farmer should not be able to enter letter', () => {

        //Change date for managing updating(from Friday at 18:00 to Saturday at 09:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        //Friday at 18:30
        cy.get('.react-calendar__month-view__days > :nth-child(12)').click()
        cy.get('#setHour').click().type("19:00")
        cy.get('.d-flex > .btn').click()

        //Add new zucchinies
        cy.get(':nth-child(11) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("Caramelle")
        cy.get('[value="0.9"]').clear().type('Cioccolata')
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
        cy.get('.list > :nth-child(11) > :nth-child(2)').should('include.text', "100")
        cy.get('.list > :nth-child(11) > :nth-child(3)').should('include.text', "0.9")

    })

    //AD ORA NON VIENE IMPEDITO!!!!

    it('a farmer should not be able to enter negative number(min is set)', () => {

        //Change date for managing updating(from Friday at 18:00 to Saturday at 09:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        //Friday at 18:30
        cy.get('.react-calendar__month-view__days > :nth-child(12)').click()
        cy.get('#setHour').click().type("19:00")
        cy.get('.d-flex > .btn').click()

        //Add new zucchinies
        cy.get(':nth-child(11) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("-10")
        //Check alert 
        cy.get(':nth-child(1) > .react-toast-notifications__toast > .react-toast-notifications__toast__content').should('include.text', 'Quantity inserted is not valid!')
        cy.get(':nth-child(2) > .react-toast-notifications__toast > .react-toast-notifications__toast__content').should('include.text', 'Quantity inserted is not valid!')
        //Close Alert
        cy.get(':nth-child(1) > .react-toast-notifications__toast > .react-toast-notifications__toast__dismiss-button > .react-toast-notifications__toast__dismiss-icon').click()
        cy.get(':nth-child(2) > .react-toast-notifications__toast > .react-toast-notifications__toast__dismiss-button > .react-toast-notifications__toast__dismiss-icon').click()

        cy.wait(1000)
        cy.get('[value="0.9"]').clear().type('-4')
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Price inserted is not valid!')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
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
        cy.get('.list > :nth-child(11) > :nth-child(2)').should('include.text', "1")
        cy.get('.list > :nth-child(11) > :nth-child(3)').should('include.text', "0.9")

    })

    //AD ORA NON VIENE IMPEDITA TALE AZIONE

    it('a farmer should not be able to issue an order without any change', () => {

        //Click on issue order
        cy.findByRole('button', { name: /update/i }).click()
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'You have not updated any product.')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })

    /*
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