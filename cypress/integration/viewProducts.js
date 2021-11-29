describe('viewProducts', () => {

    before(() => {

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')
        //Go to Login Page
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
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()
        //redirect to login
        cy.findByRole('link', { name: /login/i }).click();
        //As a farmer update the zucchinis quantity
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Add new zucchinis
        cy.get('.list > :nth-child(13)')
            .findByRole('checkbox').click()
        cy.get('.form-group > :nth-child(2)').clear().type(150)
        cy.get('.form-group > :nth-child(3)').clear().type(0.9)

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.findByText(/×/i).click()
        //Logout
        cy.get('#navbarScrollingDropdown').click()
        cy.get(':nth-child(2) > .text-black > .bi').click()
        cy.clearCookies()

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
        cy.findByRole('button', { name: /browse products/i }).click();
    })

    it("a shop employee should view a products list", () => {
        //User views a products list  -> TODO: Redo using a for cycle and prebuilded data
        for (let i = 1; i <= 50; i++) {
            cy.get('.list > :nth-child(2) > :nth-child(' + i + ')')
                .should('exist')
        }
    })

    it('a client should be able to search a product', () => {

        //CORRECT SEARCHING
        //Search a product
        cy.get('#search').type('Chicken')
        //Checking the component exist
        cy.get('.list > :nth-child(2)').should('exist')

        //WRONG SEARCHING
        //Search a product
        cy.get('#search').clear().type('Chickens')
        //Checking the component exist
        cy.findByText(/chicken/i).should('not.exist')

        //ANY ELEMENT IS SHOWN && CHECK UPPER/LOW_CASE
        cy.get('#search').clear().type('ch')
        cy.findByText(/cheese/i).should('exist')
        cy.findByText(/pistachio/i).should('exist')
        cy.findByText(/zucchini/i).should('exist')
        cy.findByText(/chicken/i).should('exist')
        cy.findByText(/peach/i).should('exist')


    })

    it('a shop Employee should be able to view the rigth quantity(After a farmer update)', () => {
        //1 SEARCH
        //Search a product
        cy.get('#search').type('Zucchini')
        //Checking the component exist
        cy.get('.list > :nth-child(2)').should('exist')
        cy.get('.list > :nth-child(2) > .below > :nth-child(3)').should('include.text', '150')
    })

})