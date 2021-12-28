
describe('enterNewClient_ShopEmployee', () => {

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

        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.wait(1000);
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to hand out a order
        cy.findByRole('button', { name: /register/i }).click({ force: true });

    })


    it('a shopEmployee should be able to add a new Client (by entering correct info) ', () => {
        //Insert the Client Info
        cy.get('#formGridName').type('Gianni')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Gia')
        cy.get('#formGridEmail').type('gia@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        //Succesfully Assert is shown
        //Check alert
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'New client registered')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
    })

    it('a shopEmployee should be able to add a new Client (by entering already user registered) ', () => {
        //Insert the Client Info
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });

        //Check alert
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Email already in use')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
    })

    it('a shopEmployee should be able to add a new Client (by entering wrong password couple) ', () => {
        //Insert the Client Info
        cy.get('#formGridName').type('Gianni')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Gia')
        cy.get('#formGridEmail').type('gia@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao2')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        //Check alert
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Password Mismatch')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
    })

    it('a shopEmployee should be able to add a new Client (by missing info) ', () => {
        //Insert the Client Info without some info
        //case0 -> Nessuna info
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        //Check alert
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //case1 -> Una info mancante
        cy.get('#formGridName').type('Gianni')
        //cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Gia')
        cy.get('#formGridEmail').type('gia@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        //Check alert
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //case2 -> Una info presente
        cy.get('#formGridName').clear()
        cy.get('#formGridUsername').clear()
        cy.get('#formGridEmail').clear()
        cy.get('#formGridPassword').clear()
        cy.get('#formGridConfirmPassword').clear()
        cy.get('#formGridSurname').type('Basilico')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click({ force: true });
        //Check alert
        cy.get('.react-toast-notifications__toast__content').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()

    })
})