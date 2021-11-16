
describe('enterNewClient', () => {

    before(() => {
        //runs once before all tests in the block -> Add new Client
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /username/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register a client/i }).click();
        //Insert the Client Info
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michelebasilico@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Logout
        cy.findByRole('link', { name: /logout/i }).click()
        cy.clearCookies()

    })

    beforeEach(() => {
        // runs before each test in the block
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /username/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add a new order
        cy.findByRole('button', { name: /register a client/i }).click();

    })

    afterEach(() => {
        //Logout
        cy.findByRole('link', { name: /logout/i }).click()
        cy.clearCookies()
    })

    after(() => {
        //clear Db
        cy.request('DELETE', 'http://localhost:3001/api/clients/michelebasilico@gmail.com')
        cy.request('DELETE', 'http://localhost:3001/api/clients/michele@gmail.com')

    })


    it('a shopEmployee should be able to add a new Client (by entering correct info) ', () => {
        //Insert the Client Info
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Succesfully Assert is shown
        cy.findByRole('alert').should('include.text', 'successfully registered customer')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server
    })

    it('a shopEmployee should be able to add a new Client (by entering already user registered) ', () => {
        //Insert the Client Info
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michelebasilico@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        // Assert is shown - TODO
        cy.findByRole('alert').should('include.text', 'Email already in use')
        //ToDo: check on the server
        //Close Alert
        cy.findByText(/×/i).click()
    })

    it('a shopEmployee should be able to add a new Client (by entering wrong password couple) ', () => {
        //Insert the Client Info
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao2')
        //Click register button
        cy.get('.spg-button').click()
        //Succesfully Assert is shown
        cy.findByRole('alert').should('include.text', 'Password Mismatch')
        //Check on the server
        //Close Alert
        cy.findByText(/×/i).click()
    })

    it('a shopEmployee should be able to add a new Client (by missing info) ', () => {
        //Insert the Client Info without some info
        //case0 -> Nessuna info
        cy.get('.spg-button').click()
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields ')
        //Close alert
        //ToDO -> Check on the server
        cy.findByRole('alert').close()
        //case1 -> Una info mancante
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        cy.get('.spg-button').click()
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server
        //case2 -> Una info presente
        cy.get('#formGridName').clear()
        cy.get('#formGridUsername').clear()
        cy.get('#formGridEmail').clear()
        cy.get('#formGridPassword').clear()
        cy.get('#formGridConfirmPassword').clear()
        cy.get('#formGridSurname').type('Basilico')
        //Click register button
        cy.get('.spg-button').click()
        // Alert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //ToDO -> Check on the server

    })
})