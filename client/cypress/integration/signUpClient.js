describe('signUp_Client', () => {

    beforeEach(() => {
        // runs before each test in the block
        
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')
        
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /Sign up/i }).click();


    })


    it('a new client should fill in each field before to sign up', () => {

        //Insert the Client Info without name
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert the Client Info without surname
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').clear()
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server


        //Insert the Client Info without username
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').clear()
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert the Client Info without password
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridPassword').clear()
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert the Client Info without confirm password
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridPassword').type('Miki')
        cy.get('#formGridConfirmPassword').clear()
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert the Client Info without password and its confirm
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridPassword').clear()
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert the Client Info without email
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        cy.get('#formGridEmail').clear()

        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert the Client Info without username,name, surname and email
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridName').clear()
        cy.get('#formGridSurname').clear()
        cy.get('#formGridEmail').clear()
        cy.get('#formGridUsername').clear()


        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

        //Insert no data
        //cy.findByRole('formGridName').contains().type('Michele')
        cy.get('#formGridName').clear()
        cy.get('#formGridSurname').clear()
        cy.get('#formGridEmail').clear()
        cy.get('#formGridPassword').clear()
        cy.get('#formGridConfirmPassword').clear()
        cy.get('#formGridUsername').clear()

        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Missing Data, check all the fields')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server


    })

    it('a new client should not be able to sign up entering two different password', () => {

        //Insert the Client Info without name
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao1')
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Password Mismatch')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server
    })
    /*
        it('a new client should not be able to sign up entering a password that does not respect estabilished criterian  ', () => {
    
            //Insert the Client Info without name
            cy.findByRole('formGridName').contains().type('Michele')
            cy.get('#formGridSurname').type('Basilico')
            cy.get('#formGridUsername').type('Miki')
            cy.get('#formGridEmail').type('michele@gmail.com')
            cy.get('#formGridPassword').type('ciao')
            cy.get('#formGridConfirmPassword').type('ciao1')
            //Click register button
            cy.get('.spg-button').click()
            //ALert is shown
            cy.findByRole('alert').should('include.text', 'Password Mismatch')
            //Close Alert
            cy.findByText(/×/i).click()
            //check on the server
        })
        */
    it('a new client should be able to sign up entering correct info', () => {

        //Insert the Client Info without name
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Popup is shown
        cy.findByText(/registration was successful/i).should('exist')
        //redirect to login
        cy.get('.modal-footer > .spg-button').click()
        cy.on("url:changed", (newUrl) => {
            expect(newUrl).to.contain("login")
          })
        //check on the server

    })

    it('a new client should not be able to sign up entering an email already used ', () => {

        //Registration n.1
        //Insert the Client Info without name
        cy.get('#formGridName').type('Luca')
        cy.get('#formGridSurname').type('Modric')
        cy.get('#formGridUsername').type('Luke')
        cy.get('#formGridEmail').type('luke@gmail.it')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.get('.spg-button').click()
        //Return to home
        cy.get('.btn-danger').click()
        
        //Registration n.2
        cy.findByRole('link', { name: /Sign up/i }).click();
        //Insert the Client Info without name
        cy.get('#formGridName').type('lucaFake')
        cy.get('#formGridSurname').type('ModircFake')
        cy.get('#formGridUsername').type('fake')
        cy.get('#formGridEmail').type('luke@gmail.it')
        cy.get('#formGridPassword').type('ciao2')
        cy.get('#formGridConfirmPassword').type('ciao2')
        //Click register button
        cy.get('.spg-button').click()
        //ALert is shown
        cy.findByRole('alert').should('include.text', 'Email already in use!')
        //Close Alert
        cy.findByText(/×/i).click()
        //check on the server

    })

})