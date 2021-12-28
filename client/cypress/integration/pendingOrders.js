describe('pendingOrders', () => {

    before(() => {
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //Add new Client as a ShopEmployee
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
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

        //Add new order as a shopEmployee (Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00)
        //Change date
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.findByRole('button', { name: /new order/i }).click({ force: true });
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com", { force: true })
        //Steak 3$
        cy.get('.im-search_input').type('Steak')
        cy.get('.im-productcard > .card-body')
            .findByRole('textbox').type('50');

        cy.get('.im-productcard')
            .findByRole('button', { name: /add/i }).click()
        //click issue order button
        cy.findByText('50 Steak').should('exist')
        cy.findByRole('button', { name: /issue order/i }).click({ force: true });


        //Product hand-out as ShopEmployee (You can hand out an order from Wednesday at 09:00 to Friday at 18:00)

        cy.findByRole('button', { name: /hand out/i }).click({ force: true });
        //Change date
        cy.findByRole('button', { name: /set/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(17)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        cy.get('.form-control').type('michele@gmail.com')
        cy.findByRole('button', { name: /search/i }).click({ force: true });



        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
    })

    //Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00

    it('a shopEmployee should not be able to view pendingOrders (from Sunday at 23:00 to Saturday at 9:00)', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click({ force: true })
        cy.get('#setHour').click().type("23:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00').should('exist')

        for (let i = 15; i < 19; i++) {
            //Check on every day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click({ force: true })
            if (i === 19) {
                //On Saturday just to 09:00 am
                cy.get('#setHour').click().type("08:30")
            }
            //Set the date
            cy.get('.d-flex > .btn').click()
            //Check it's not possible to update any product
            cy.findByText('Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00').should('exist')
        }

    })

    it('a shopEmployee should be able to view pendingOrders (from Saturday at 9:00 to Sunday at 23:00 )', () => {
        //Change date for managing updating(from Saturday at 09:00 to Friday at 18:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month -> Only in the first month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click({ force: true })
        cy.get('#setHour').click().type("09:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00').should('not.exist')

        cy.findByRole('button', { name: /set/i }).click()
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click({ force: true })
        cy.get('#setHour').click().type("22:30")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Check it's not possible to update any product
        cy.findByText('Orders can be purchased only from Saturday at 9:00 to Sunday at 23:00').should('not.exist')

    })

    it('a shopEmployee should be able to view pending orders', () => {

        //Click Pending Orders
        cy.get(':nth-child(3) > :nth-child(1) > .se-button').click()
        cy.wait(1000)
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('exist')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('exist')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(3)').should('exist')

        //Check about id(ever change in the DB), price and status
        //cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(1)').should('include.text', 'id : 27')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(2)').should('include.text', 'price : 150')
        cy.get('.cont > :nth-child(2) > :nth-child(2) > :nth-child(3)').should('include.text', 'status : pending')

    })

})