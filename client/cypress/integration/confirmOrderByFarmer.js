describe('confirmOrderByFarmer', () => {

    before(() => {
        // runs before each test in the block
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //Go to SignUp Page
        cy.visit('http://localhost:3000');

        //AS A SHOP EMPLOYEE -> ADD A NEW CLIENT
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click({ force: true });
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        cy.visit('http://localhost:3000');
        //cy.get('.react-toast-notifications__toast__dismiss-icon').click()


        //AS A SHOPEMPLOYEE -> ADD A NEW ORDER
        cy.get('[href="/login"]').click()
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Insert the user mail
        cy.findByLabelText('Client mail').type("michele@gmail.com", { force: true })
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
        //Torno al menu utente
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Vado sulla conferma prodotti
        cy.findByRole('button', { name: /confirm products/i }).click({ force: true })
    })
/*
    //You can Confirm Product between Sunday at 23:00 and Monday at 09:00
    it('a farmer should be able to confirm an order from Sunday at 23:00 and Monday at 09:00', () => {

        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').click().type("23:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('not.exist')

        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('not.exist')

        let time = "00"
        for (let i = 0; i < 17; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()

            if (i === 0) {
                cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
            }


            if (i % 2 === 0)
                cy.get('#setHour').click().type(time + ":00")
            else {
                cy.get('#setHour').click().type(time + ":30")
                time = "0" + String(parseInt(time) + 1)

            }

            //Set the date
            cy.get('.container-fluid > .d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('not.exist')
        }

    })


    it("a farmer should be able to view an order performed by a client", () => {
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //CHECK APPLE
        cy.get('tbody > :nth-child(1) > :nth-child(1)').should('include.text', "Apple")
        cy.get('tbody > :nth-child(1) > :nth-child(2)').should('include.text', "10")
        //CHECK BANANA
        cy.get('tbody > :nth-child(2) > :nth-child(1)').should('include.text', "Banana")
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('include.text', "10")
    })

    it("a farmer should not be able to confirm an order performed by a client(with negative quantity)", () => {
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //5/10 Apple confirmed
        cy.get(':nth-child(1) > :nth-child(4) > .im-input').clear({ force: true }).type('-5', { force: true })
        //Confirm a part of the order
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })

        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation not ok')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()


    })

    it("a farmer should be not able to confirm an order performed by a client(Without any quantity)", () => {
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //5/10 Apple confirmed
        cy.get(':nth-child(1) > :nth-child(4) > .im-input').clear({ force: true })
        //Confirm a part of the order
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })

        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation not ok')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })

    it("a farmer should be not able to confirm an order performed by a client(By entering text)", () => {
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()

        //5/10 Apple confirmed
        cy.get(':nth-child(1) > :nth-child(4) > .im-input').clear({ force: true }).type('ciao', { force: true })
        //Confirm a part of the order
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })

        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation not ok')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })
*/
    it("a farmer should be able to confirm an order", () => {
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(21)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.wait(1500)
        //Confirm the order
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation ok')
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })
/*
    //UNA VOLTA ANDATI AVANTI IL CRONO ALTERA I DATI, NON TESTARE DI NUOVO TORNANDO DIETRO NEL TEMPO
    it('a farmer should be not able to confirm an order from Monday at 09:00 to Sunday at 23:00', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')

        for (let i = 16; i < 22; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click()

            if (i === 21) {
                cy.get('#setHour').click().type("22:30")
            }

            //Set the date
            cy.get('.container-fluid > .d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('You can Confirm Product between Sunday at 23:00 and Monday at 09:00').should('exist')
        }

    })
*/

    it("a farmer should be not able to view an order performed by a client the last week", () => {
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(21)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.wait(1500)
        //CHECK APPLE and BANANA do not exist
        cy.findByText('Apple').should("not.exist")
        cy.findByText('Banana').should("not.exist")

    })



})