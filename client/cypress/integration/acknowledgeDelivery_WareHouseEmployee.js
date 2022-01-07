describe('acknowledgeDeliveryByWarehouseEmployee', () => {

    //TODO -> Clean every information added during the tests

    before(() => {
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //runs once before all tests in the block -> 

        //AS a shopEmployee -> Add new Client
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a shopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
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

        //As a shopEmployee -> Make a new order
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

        //AS A FARMER -> CONFIRM THE ORDER
        //Login as a farmer
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Vado sulla conferma prodotti
        cy.findByRole('button', { name: /confirm products/i }).click({ force: true })
        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.get('#setHour').click().type("23:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.wait(1500)
        //Confirm the order
        cy.findByRole('button', { name: /confirm/i }).click({ force: true })
        //Check alert 
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Confirmation ok')
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
        //Login as a warehouse page
        cy.findByRole('textbox', { name: /email/i }).type('hallbicocca@gmail.com');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /manage deliveries/i }).click({ force: true });

    })

/*
    //You can ack arrivals from Monday at 09:00 to Tuesday at 18:00
    //Parto dalle 10 perchè alle 9 e mezza ho gia fatto un ordine (Problema con il crono)
    it('a client should be able to modify an order from Monday at 09:00 to Tuesday at 18:00', () => {

        //Change date for managing updating
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(15)').click()
        //Set the date
        cy.get('.d-flex > .btn').click()

        let time = "09"
        let hour = "0"

        for (let i = 0; i < 60; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()

            if (i % 2 === 0)
                cy.get('#setHour').click().type(time + ":00")
            else {
                cy.get('#setHour').click().type(time + ":30")

                //Solo ogni ora faccio il seguente controllo (cioè devo passare all'ora succesiva)
                if (i >= 23) {
                    if (i === 23) {
                        hour = "0"
                        cy.get('.react-calendar__month-view__days > :nth-child(16)').click()
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

            cy.wait(2000)
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

    // from Tuesday at 18:00 to Monday at 09:00
    it('a warehouse employee should not be able to ack an order from Tuesday at 18:00 to Monday at 09:00', () => {

        //Change date for managing updating(from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(16)').click()
        cy.get('#setHour').click().type("18:00")
        //Set the date
        cy.get('.d-flex > .btn').click()

        cy.findByText("You can ack arrivals from Monday at 09:00 to Tuesday at 18:00").should('exist')


        for (let i = 17; i < 23; i++) {

            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click()

            if (i === 22) {
                cy.get('#setHour').click().type("08:30")
            }

            //Set the date
            cy.get('.container-fluid > .d-flex > .btn').click()
            //Check the order is not visible
            cy.findByText("You can ack arrivals from Monday at 09:00 to Tuesday at 18:00").should('exist')

        }

    })
*/
})
