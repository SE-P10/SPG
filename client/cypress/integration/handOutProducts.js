describe('enterNewClientOrder', () => {

    before(() => {
        //runs once before all tests in the block -> Add new Client

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //runs once before all tests in the block -> Add new Client
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click();
        //Iscrivo un client
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.container > .justify-content-center > .spg-button').click()
        //Iscrivo un 2 client
        cy.findByRole('button', { name: /register client/i }).click();
        cy.get('#formGridName').type('Michele2')
        cy.get('#formGridSurname').type('Basilico2')
        cy.get('#formGridUsername').type('Mik2i')
        cy.get('#formGridEmail').type('michele2@gmail.com')
        cy.get('#formGridPassword').type('ciao2')
        cy.get('#formGridConfirmPassword').type('ciao2')
        //Click register button
        cy.get('.container > .justify-content-center > .spg-button').click()


        //Recharge his wallet
        cy.get(':nth-child(3) > :nth-child(2) > .se-button').click()
        cy.get('.form-control').type('michele@gmail.com')
        cy.get('.card-body > .spg-button').click()
        cy.get('[min="0"]').clear().type(50)
        cy.get('form > .spg-button').click()

        //Add new order -> Con portafoglio pieno
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Steak 3$
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('5')

        //click issue order button
        cy.get('.ml-3 > :nth-child(2) > .spg-button').click()

        //Add new order -> Con portafoglio vuoto
        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele2@gmail.com")
        //Steak 3$
        cy.get('#search').type('Steak')
        cy.get('.below > .btn').click();
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('5')

        //click issue order button
        cy.get('.ml-3 > :nth-child(2) > .spg-button').click()

        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()
    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /Hand Out/i }).click();

    })

    it('a shopEmployee should be able to view a right order price', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Assertion on price
        cy.get('.below.col > :nth-child(1) > :nth-child(2)').should('include.text', '15')

    })

    it('a shopEmployee should be able to hand out a client order (by entering not registered user)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('topogigio@gmail.it')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Assertion on alert
        cy.get('.fade').should('include.text', 'No orders found')

    })
    /*
        it('a shopEmployee should be able to hand out a client order (by entering user without order)', () => {
            //Enter wrong email
            cy.findByRole('textbox').type('topogigio@gmail.it')
            //Click on search button
            cy.findByRole('button', {  name: /search/i}).click()
            //Assertion on alert
            cy.get('.fade').should('include.text','No orders found')
            
        })
    */
    it('a shopEmployee should be able to hand out a client order (by entering correct email and order)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michele@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Status booked
        cy.get('.below.col > :nth-child(1) > :nth-child(3)').should('include.text', 'booked')
        //Click on hand out button
        cy.get(':nth-child(1) > :nth-child(4) > .spg-button').click()
        //Check Alert
        cy.findByRole('alert').should('include.text', 'Order hands out correctly!')
        //Check the order
        cy.findByRole('button', { name: /check orders/i }).click()
        cy.findByRole('textbox').type('michele@gmail.com')
        cy.findByRole('button', { name: /search/i }).click()
        cy.findByText(/status : handout/i).should('exist')


    })

    it('a shopEmployee should see the correct amount of client wallet after a hand out', () => {
        //Ordine che ho fatto nel test precedente
        cy.get('.back-button').click()
        cy.get(':nth-child(3) > :nth-child(2) > .se-button').click()
        cy.get('.form-control').type('michele@gmail.com')
        cy.get('.card-body > .spg-button').click()
        cy.get('[disabled=""]').should('have.value', '35')


    })
    it('a shopEmployee should be able to hand out a client order (by entering correct email and order but with empty wallet, so paying with cash)', () => {
        //Enter wrong email
        cy.findByRole('textbox').type('michele2@gmail.com')
        //Click on search button
        cy.findByRole('button', { name: /search/i }).click()
        //Check
        cy.get('.below.col > :nth-child(1) > :nth-child(3)').should('include.text', 'pending')
        cy.get(':nth-child(4) > .spg-button').click()
        //????????????????????????????????????????????????????????????????
        //Check Alert
        cy.findByRole('alert').should('include.text', 'Order hands out correctly!')
    })

})