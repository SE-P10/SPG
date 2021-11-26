describe('signUp_Client', () => {

    beforeEach(() => {
        // runs before each test in the block
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a farmer
        cy.get('#username').type('paolobianchi@demo.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click a button to add new Client
    })

    afterEach(() => {
        // runs before each test in the block
        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.visit('http://localhost:3000/farmerpage');
        cy.findByRole('link', { name: /login/i }).click()
    })


    it('a farmer should be able to switch from menu to functionality page', () => {

        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Check
        cy.findByText('Update Availability').should('exist')
        //Return to menu
        cy.findAllByRole('button')[1].click()
        //Check
        cy.findByText('Update Product Availability').should('exist')

    })

    it('a farmer should be able to update the available quantity of products', () => {

        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Add new bananas
        cy.findAllByRole('checkbox')[0].click()
        //Decrement expired apple
        cy.findAllByRole('checkbox')[1].click()
        cy.findAllByRole('textbox')[0].type(150)
        cy.findAllByRole('textbox')[1].click(50)

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.findAllByText(/actual quantity : /i)[0].should('include.text', "150")
        cy.findAllByText(/actual quantity : /i)[1].should('include.text', "50")
    })

    it('a farmer should not be able to enter letter', () => {

        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Add new bananas
        cy.findAllByRole('checkbox')[0].click()
        cy.findAllByRole('textbox')[0].type("Caramelle")
        //Check alert
        cy.findByRole('alert').should('include.text', 'not a number')
        //Close Alert
        cy.findByText(/×/i).click()

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'Wrong Request')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.findAllByText(/actual quantity : /i)[0].should('include.text', "100")

    })

    it('a farmer should not be able to enter negative number', () => {

        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Add new bananas
        cy.findAllByRole('checkbox')[0].click()
        cy.findAllByRole('textbox')[0].type("-25")
        //Check alert
        cy.findByRole('alert').should('include.text', 'Negative quantity')
        //Close Alert
        cy.findByText(/×/i).click()

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'Wrong Request')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.findAllByText(/actual quantity : /i)[0].should('include.text', "100")
    })

    it('a farmer should not be able to issue an order without any change', () => {

        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'yuo have not updated any items')
        //Close Alert
        cy.findByText(/×/i).click()

        //The same test but with product just selected
        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Select some product
        cy.findAllByRole('checkbox')[0].click()
        cy.findAllByRole('checkbox')[5].click()
        cy.findAllByRole('checkbox')[6].click()
        cy.findAllByRole('checkbox')[9].click()
        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'yuo have not updated any items')
        //Close Alert
        cy.findByText(/×/i).click()

    })

    it('a farmer should not be able to overcame a max fixed quantity of products ', () => {

        //Click on update button
        cy.findByRole('button', { name: /update products availability/i }).click()
        //Select some product
        cy.findAllByRole('checkbox')[0].click()
        cy.findByRole('textbox').type("99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999")

        //Click on issue order
        cy.findByRole('button', { name: /Issue Order/i }).click()
        //Check alert
        cy.findByRole('alert').should('include.text', 'yuo have exceed the max value of product')
        //Close Alert
        cy.findByText(/×/i).click()

        //Now let's check the quantities
        cy.findByRole('button', { name: /update products availability/i }).click()
        cy.findAllByText(/actual quantity : /i)[0].should('include.text', "100")
    })
})