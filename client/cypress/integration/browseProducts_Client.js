describe('browseProducts_Client', () => {

    before(() => {
        // runs before each test in the block
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //SIGN UP NEW CLIENT AS A UNREGISTERED USER
        //Go to SignUp Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /Sign up/i }).click();
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
        cy.findByRole('button', { name: /yes/i }).click({ force: true });
        //Torno al menu utente
        cy.findByRole('link', { name: /login/i }).click();


        //UPDATE PRODUCT AVAILABILITY AS A FARMER
        cy.findByRole('textbox', { name: /email/i }).type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click({ force: true })
        //Change date for managing updating(from Friday at 18:00 to Saturday at 09:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(12)').click()
        cy.get('#setHour').click().type("19:00")
        //Set the date
        cy.get('.d-flex > .btn').click()
        //Add new zucchinies
        cy.get(':nth-child(11) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("150")
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
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);
        cy.clearCookies()

    })

    beforeEach(() => {
        //Torno al menu utente
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a client
        cy.get('#username').type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //Vado sulla ricerca prodotti
        cy.findByText(/browse products/i).click({ force: true })
    })

    it('a client should be able to search a product', () => {

        //CORRECT SEARCHING
        //Search a product
        cy.findByRole('searchbox').type('Chicken', { force: true })
        //Checking the component exists
        cy.get('.im-productcard').should('exist')
        cy.get('.im-productcard')
            .findByText(/chicken/i)
            .should('exist')


        //WRONG SEARCHING
        //Search a product
        cy.findByRole('searchbox').clear().type('Chickens', { force: true })
        //Checking the component does not exist
        cy.get('.im-productcard').should('not.exist')

        //ANY ELEMENT IS SHOWN && CHECK UPPER/LOW_CASE
        cy.findByRole('searchbox').clear().type('ch', { force: true })
        cy.findByText(/cheese/i).should('exist')
        cy.findByText(/pistachio/i).should('exist')
        cy.findByText(/zucchini/i).should('exist')
        cy.findByText(/chicken/i).should('exist')
        cy.findByText(/peach/i).should('exist')


    })

    it('a client should be able to view the rigth quantity(After a farmer update)', () => {
        //1 SEARCH
        //Search a product
        cy.findByRole('searchbox').type('Zucchini', { force: true })
        //Checking the component exists
        cy.get('.im-productcard').should('exist')
        cy.get('.im-productcard')
            .findByText(/zucchini/i)
            .should('exist')
        cy.get('.text-end').should('include.text', '150')
    })

    it('a client should be able to see the products everyday', () => {
        //User views a products list 
        for (let i = 8; i <= 14; i++) {
            //Change day of the week
            cy.findByRole('button', { name: /set/i }).click()
            if (i === 8) {
                //Next month
                cy.get('.react-calendar__navigation__next-button').click()
            }
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click()
            cy.get('.d-flex > .btn').click()
            //Check anyday
            for (let i = 1; i <= 46; i++) {
                cy.get(':nth-child(' + i + ') > .card-body')
                    .should('exist')
            }
        }
    })

})