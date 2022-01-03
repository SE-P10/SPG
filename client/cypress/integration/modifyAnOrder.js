describe('newOrderByClient', () => {

    //TODO -> Clean every information added during the tests

    before(() => {
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //runs once before all tests in the block -> 

        //AS a client -> Add new Client
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click({ force: true });
        //Iscrivo un client
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

        //AS A SHOP EMPLOYEE -> RECHARGE THE CLIENT'S WALLET
        cy.findByRole('button', { name: /topup a wallet/i }).click({ force: true });
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Enter right email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //type a number to recharge
        cy.findByRole('spinbutton').clear()
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        cy.findByRole('spinbutton').type('100');
        //click on recharge button
        cy.findByRole('button', { name: /recharge the wallet/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'successfully recharged your wallet')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);
        cy.clearCookies()

        //AS A CLIENT -> MAKE AN ORDER
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Aggiungo 10 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .type(10, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //Aggiungo 10 mele
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('textbox')
            .type(10, { force: true })
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('button', { name: /add/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/10 Banana/i).should('exist')
        cy.findByText(/10 Apple/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);
        cy.clearCookies()
    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /your orders/i }).click({ force: true });

    })

    it('a client should be able to view a performed order', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)
        cy.get('.over > :nth-child(1)').should('exist').should('include.text', '70€')
        cy.get('.over > :nth-child(2)').should('exist').should('include.text', 'booked')
        cy.get('.over > :nth-child(3)').should('exist')
        cy.get('.over > :nth-child(4)').should('exist')

    })

    it('a client should be able to modify an order', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/10 Banana/i).should('exist')
        cy.findByText(/10 Apple/i).should('exist')

        //Aggiungo 5 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .clear({ force: true })
            .type(15, { force: true })
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /modify/i }).click({ force: true });
        //Aggiungo 5 mele
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('textbox')
            .clear({ force: true })
            .type(15, { force: true })
        cy.get('.container > .im-grid > :nth-child(2)')
            .findByRole('button', { name: /modify/i }).click({ force: true });
        //click issue order button
        //Check on basket
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()



    })

    it('a client should not be able to modify an order (by entering no products) ', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')

        //Clear the basket
        cy.get('.im-basket > .card-body > .card-text > :nth-child(1)')
            .findByRole('button')
            .click({ force: true })
        cy.get('.im-basket > .card-body > .card-text > :nth-child(2)')
            .findByRole('button')
            .click({ force: true })

        cy.wait(3000)
        //click on issue order button
        cy.findByRole('button', { name: /issue order/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'No products found in the basket!')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
    })

    it('a client should not be able to modify an order (by entering n. of product not available) ', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')

        //Aggiungo 1000 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .clear({ force: true })
            .type(1000, { force: true })

        //click on modify button
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /modify/i }).click({ force: true });

        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Quantity inserted is not valid!')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })


    it('a client should not be able to modify an order(by entering negative n. of product) ', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')

        //Aggiungo -10 banane
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .clear({ force: true })
            .type(-10, { force: true })

        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Quantity inserted is not number!')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })

    it('a client should not be able to modify an order (by entering product without quantity) ', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')

        //Pulisco il campo
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .clear({ force: true })
        //click on modify button
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /modify/i }).click({ force: true });
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Quantity inserted is not valid!')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()


    })

    //Controllo su valore 0
    it('a client should not be able to modify an order (by entering 0 as n. of product) ', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')

        //Pulisco il campo
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('textbox')
            .clear({ force: true })
            .type('0', { force: true })
        //click on modify button
        cy.get('.container > .im-grid > :nth-child(1)')
            .findByRole('button', { name: /modify/i }).click({ force: true });
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Quantity inserted is not valid!')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })

    //IN QUESTO CASO NON VIENE FATTO IL CONTROLLO SULL'EMAIL PERCHé E GIA SOTTOINTESA(ESSENDO IL CLIENT)

    it('a client should be able to search a product', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check the order is visible
        cy.wait(1500)
        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        cy.findByRole('searchbox').type('Chicken', { force: true })
        //Checking the component exists
        cy.get('.im-productcard').should('exist')
        cy.get('.im-productcard')
            .findByText(/chicken/i)
            .should('exist')


        //WRONG SEARCHING
        //Search a product
        cy.findByRole('searchbox').clear({ force: true }).type('Chickens', { force: true })
        //Checking the component does not exist
        cy.get('.im-productcard').should('not.exist')

        //ANY ELEMENT IS SHOWN && CHECK UPPER/LOW_CASE
        cy.findByRole('searchbox').clear({ force: true }).type('ch', { force: true })
        cy.findByText(/cheese/i).should('exist')
        cy.findByText(/pistachio/i).should('exist')
        cy.findByText(/zucchini/i).should('exist')
        cy.findByText(/chicken/i).should('exist')
        cy.findByText(/peach/i).should('exist')

    })

    it('a client should be able to use a filter', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Click filter button
        cy.get(':nth-child(3) > .below').click()

        //TYPE FILTER
        cy.get('form.below > .im-input').select('Chicken', { force: true })
        //Checking the component exist
        cy.get('.im-productcard').should('exist')
        cy.get('.im-productcard')
            .findByText(/chicken/i)
            .should('exist')

        //Remove the filter
        cy.get(':nth-child(3) > .im-button').click()

        //FARMER FILTER
        //Click filter button
        cy.get(':nth-child(3) > .below').click()
        cy.get(':nth-child(3) > .im-input').select('PaoloBianchi')
        //Checking the component exist

        for (let i = 1; i <= 50; i++) {
            cy.get('.im-grid > :nth-child(' + i + ')')
                .should('exist')
        }

        //Remove the filter
        cy.get(':nth-child(3) > .im-button').click()

        //FARMER & TYPE FILTER
        //DEVO AGGIUNGERE UN CHICKEN DI UN ALTRO FARMER
        /*cy.get(':nth-child(4) > .below').click()
        cy.get('.below > .form-control').select('Chicken')
        cy.get(':nth-child(5) > .form-control').select('PaoloBianchi')
        //Checking the length of the list(Should be just 1)
 
        cy.get('.list > :nth-child(1)')
            .should('exist')
        cy.get('.list > :nth-child(2)')
            .should('not.exist')
 
        cy.get('.list > :nth-child(1) > :nth-child(2)').should('include.text', 'Chicken')*/

    })




    //Controllo disponibilità dopo un acquisto
    it('a client should be able to view the rigth amount of available product after a purchase', () => {
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //Check the order is visible
        cy.wait(1500)

        //Modify button
        cy.get('.over > :nth-child(3)')
            .findByRole('button')
            .click()

        //Check on basket
        cy.wait(5000)
        cy.findByText(/15 Banana/i).should('exist')
        cy.findByText(/15 Apple/i).should('exist')

        //Check the quantity remained
        cy.get(':nth-child(1) > .card-body > .card-text > :nth-child(3) > .text-end')
            .should("include.text", "90 left of 100 available")
        cy.get(':nth-child(2) > .card-body > .card-text > :nth-child(3) > .text-end')
            .should("include.text", "90 left of 100 available")
    })

    //You can purchase an order from Saturday at 09:00 and Sunday at 23:00
    //Parto dalle 10 perchè alle 9 e mezza ho gia fatto un ordine (Problema con il crono)
    it('a client should be able to modify an order from Saturday at 9:00 to Sunday at 23:00', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        //Set the date
        cy.get('.d-flex > .btn').click()

        let time = "10"
        let hour = "0"

        for (let i = 0; i < 70; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()

            if (i % 2 === 0)
                cy.get('#setHour').click().type(time + ":00")
            else {
                cy.get('#setHour').click().type(time + ":30")

                //Solo ogni ora faccio il seguente controllo (cioè devo passare all'ora succesiva)
                if (i >= 21) {
                    if (i === 21) {
                        hour = "0"
                        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
                    }
                    if (hour.length === 1) {
                        time = "0" + hour
                    } else {
                        time = hour
                    }

                    hour = String(parseInt(hour) + 1)
                }
                else
                    time = String(parseInt(time) + 1)

            }

            //Set the date
            cy.get('.container-fluid > .d-flex > .btn').click()
            //Check the order is visible
            cy.wait(1500)
            cy.get('.over > :nth-child(1)').should('exist').should('include.text', '105€')
            cy.get('.over > :nth-child(2)').should('exist').should('include.text', 'booked')
            cy.get('.over > :nth-child(3)')
                .findByRole('button')
                .should('exist')
            cy.get('.over > :nth-child(4)').should('exist')
        }

    })

    //You can purchase an order from Saturday at 09:00 and Sunday at 23:00
    it('a client should not be able to modify an order from Sunday at 23:00 to Saturday at 9:00', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.get('.over > :nth-child(1)').should('exist').should('include.text', '105€')
            cy.get('.over > :nth-child(2)').should('exist').should('include.text', 'booked')
            cy.get('.over > :nth-child(3)')
                .findByRole('button')
                .should('not.exist')
            cy.get('.over > :nth-child(4)').should('exist')

        for (let i = 16; i < 21; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click()

            if (i === 20) {
                cy.get('#setHour').click().type("08:30")
            }

            //Set the date
            cy.get('.container-fluid > .d-flex > .btn').click()
            //Check the order is not visible
            cy.wait(1500)
            cy.get('.over > :nth-child(1)').should('exist').should('include.text', '105€')
            cy.get('.over > :nth-child(2)').should('exist').should('include.text', 'booked')
            cy.get('.over > :nth-child(3)')
                .findByRole('button')
                .should('not.exist')
            cy.get('.over > :nth-child(4)').should('exist')
        }

    })
})