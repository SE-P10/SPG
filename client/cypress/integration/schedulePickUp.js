describe('SchedulePickUpByClient', () => {

    //TODO -> Clean every information added during the tests

    before(() => {
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')

        //Add new Client -> By Shop Employee
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

        //Add an order -> By ShopEmployee
        //Mi sposto in un sabato del prossimo mese per poter fare l'ordine -> Sabato alle 9:30
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        cy.get('#setHour').click().type('09:30')
        cy.wait(1000)
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('.modal-header > .btn-close').click()

        cy.findByRole('button', { name: /new order/i }).click();
        //Insert the user mail
        cy.findByRole('textbox', { name: /client mail/i }).type("michele@gmail.com")
        //Add products
        cy.get('#search').type('Steak')
        //Aggiungo 50 elementi
        cy.get('.below > :nth-child(6)')
            .findByRole('textbox')
            .clear()
            .type('5')
        //click issue order button
        cy.get(':nth-child(5) > .spg-button').click()
        cy.findByRole('button', { name: /issue order/i }).click()
        //Should be appear alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly!')
        //Close Alert
        cy.get('.btn-close').click()
        //ToDO -> Check on the server
        //Logout
        cy.get('[href="/"] > .bi')
        cy.clearCookies()

        //Confirm Order -> By Farmer
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /confirm products/i }).click()
        //Mi sposto in un altra data per verificare di essere nella data giusta
        cy.get('.card-body > .btn').click()
        cy.findByRole('button', { name: /›/i }).click()
        //Il quattordicesimo elemento è sempre una domenica(ed esiste sempre per ogni mese)
        cy.get('#setHour').click().type('23:30')
        cy.wait(1000)
        cy.get('.react-calendar__month-view__days > :nth-child(14)').click()
        cy.wait(1000)
        cy.get('.modal-header > .btn-close').click()
        cy.get('.btn-block').click()
        cy.get('.btn-close')
        //Logout
        cy.get('[href="/"] > .bi')
        cy.clearCookies()


    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('michele@gmail.com');
        cy.findByLabelText(/password/i).type('ciao');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /your orders/i }).click()

    })

    it('an user should be able to schedule PickUp Date only after an order confirmed', () => {
       
    })

    it('an user should be able to schedule PickUp Date', () => {
       
    })

})