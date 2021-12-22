describe('viewProductsByUser', () => {

    before(() => {

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')
        
        
        //USER REGISTRATION BY SHOP EMPLOYEE
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
        cy.findByRole('button', { name: /register client/i }).click({force: true});
        //Iscrivo un client
        cy.get('#formGridName').type('Michele')
        cy.get('#formGridSurname').type('Basilico')
        cy.get('#formGridUsername').type('Miki')
        cy.get('#formGridEmail').type('michele@gmail.com')
        cy.get('#formGridPassword').type('ciao')
        cy.get('#formGridConfirmPassword').type('ciao')
        //Click register button
        cy.findByRole('button', { name: /register/i }).click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.clearCookies()
        cy.wait(1000);


        //UPDATE OBJECT QUANTITY BY FARMER
        //redirect to login
        cy.findByRole('link', { name: /login/i }).click();
        //As a farmer update the zucchinis quantity
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Change date for managing updating(from Friday at 18:00 to Saturday at 09:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        //Friday at 18:30
        cy.get('.react-calendar__month-view__days > :nth-child(12)').click()
        cy.get('#setHour').click().type("19:00")
        cy.get('.d-flex > .btn').click()

        //Add new zucchinies
        cy.get(':nth-child(13) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("150")
        cy.get('[value="0.9"]').clear().type("0.9")
        //Click on issue order
        cy.get('.modal-footer > .im-button').click()
        //Check alert
        //cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        //cy.findByText(/×/i).click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click()
        cy.clearCookies()
        cy.wait(1000);

    })

    beforeEach(() => {
        //User click on login button
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login
        cy.findByRole('textbox', { name: /email/i }).type('john.doe@demo01.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on Browse Products
        cy.findByRole('button', { name: /browse products/i }).click({force: true});
    })

    it("a shop employee should view a products list", () => {
        //User views a products list  -> TODO: Redo using a for cycle and prebuilded data
        for (let i = 1; i <= 50; i++) {
            cy.get(':nth-child('+ i +') > .card-body')
                .should('exist')
        }
    })  

    it('a client should be able to search a product', () => {

        //CORRECT SEARCHING
        //Search a product
        cy.get('.im-search_input').type('Chicken',{force: true})
        //Checking the component exist
        cy.get('.card-body').should('exist').should('contain.text',"Chicken")

        //WRONG SEARCHING
        //Search a product
        cy.get('.im-search_input').clear({force: true}).type('Chickens',{force: true})
        //Checking the component exist
        cy.findByText(/chicken/i).should('not.exist')

        //ANY ELEMENT IS SHOWN && CHECK UPPER/LOW_CASE
        cy.get('.im-search_input').clear({force: true}).type('ch')
        cy.findByText(/cheese/i).should('exist')
        cy.findByText(/pistachio/i).should('exist')
        cy.findByText(/zucchini/i).should('exist')
        cy.findByText(/chicken/i).should('exist')
        cy.findByText(/peach/i).should('exist')


    })

    it('a shop Employee should be able to view the rigth quantity(After a farmer update)', () => {
        //1 SEARCH
        //Search a product
        cy.get('.im-search_input').type('Zucchini',{force: true})
        //Checking the component exist
        cy.get('.card-body').should('exist').should('include.text', '150')
    })

})