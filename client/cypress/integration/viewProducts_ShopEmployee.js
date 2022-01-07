describe('viewProducts_ShopEmployee', () => {

    before(() => {

        //Clear DB (it is allowed only before the tests) -> All quantity are equal to 100, wallet the same and there are two user
        cy.request('DELETE', 'http://localhost:3001/api/test/restoretables/')


        //USER REGISTRATION BY SHOP EMPLOYEE
        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
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
        cy.findByRole('button', { name: /register/i }).click()

        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
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
        cy.get(':nth-child(11) > :nth-child(4) > #CheckBoxItem').click()
        cy.get('[value="100"]').clear().type("150")
        cy.get('[value="0.9"]').clear().type("0.9")

        //Click on first update
        cy.get('.modal-footer > .im-button').click()
        //Second Update
        cy.get('.below.im-button').click()
        //Check alert -> It's not a control on farmer
        //cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.clearCookies()
        cy.wait(1000);


        //CLIENT PURCHASE(By shop Employee)

        //Go to Login Page
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login as a ShopEmployee
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //As a shopEmployee make an order for the client
        cy.findByRole('button', { name: /new order/i }).click({ force: true })
        //Change date for managing updating(only from Saturday at 9:00 to Sunday at 23:00)
        cy.findByRole('button', { name: /set/i }).click()
        //Saturday at 09:30
        //Next month
        cy.get('.react-calendar__navigation__next-button').click()
        cy.get('.react-calendar__month-view__days > :nth-child(13)').click()
        cy.get('#setHour').click().type("09:30")
        cy.get('.d-flex > .btn').click()
        //Enter the email
        cy.findByRole('textbox', { name: /client mail/i }).type('michele@gmail.com', { force: true })
        //Buy some bananas
        cy.findByRole('searchbox', { name: /search for a product!/i }).type("egg", { force: true })
        //Add two bananas
        cy.findByRole('button', { name: /\+/i }).click().click()
        //Add to basket
        cy.findByRole('button', { name: /add/i }).click()
        //Click on issue order
        cy.wait(2000)
        cy.findByRole('button', { name: /issue order/i }).click()
        //Check alert -> It's not a control on farmer
        //cy.findByRole('alert').should('include.text', 'Request sent correctly')
        //Close Alert
        cy.get('.react-toast-notifications__toast__dismiss-icon').click()
        //Logout
        cy.get('.navbar-nav > [href="/"]').click({ force: true })
        cy.clearCookies()
        cy.wait(1000);
    })

    beforeEach(() => {
        //User click on login button
        cy.visit('http://localhost:3000');
        cy.findByRole('link', { name: /login/i }).click();
        //Login
        cy.findByRole('textbox', { name: /email/i }).type('mario@spg.it');
        cy.findByLabelText(/password/i).type('password');
        cy.findByRole('button', { name: /login/i }).click();
        //Click on Browse Products
        cy.findByRole('button', { name: /browse products/i }).click({ force: true });
    })

    it("a shop employee should view a products list", () => {
        //User views a products list  -> TODO: Redo using a for cycle and prebuilded data
        for (let i = 1; i <= 46; i++) {
            cy.get(':nth-child(' + i + ') > .card-body')
                .should('exist')
        }
    })

    it("a shop employee should view a products list every day of the week", () => {
        //User views a products list 
        for (let i = 13; i <= 20; i++) {
            //Change day of the week
            cy.findByRole('button', { name: /set/i }).click()
            cy.get('.react-calendar__month-view__days > :nth-child(' + i + ')').click()
            cy.get('.d-flex > .btn').click()
            //Check anyday
            for (let i = 1; i <= 46; i++) {
                cy.get(':nth-child(' + i + ') > .card-body')
                    .should('exist')
            }
        }
    })
/*
    it("a shop employee should view a products list any momement of the day", () => {
        //User views a products list 
        for (let i = 0; i <= 48; i++) {
            //Change day of the week
            cy.findByRole('button', { name: /set/i }).click()
            //Next half-our
            let time;
            if (i < 18)
                time = "0" + parseInt(i / 2)
            else
                time = String(parseInt(i / 2))

            if (i % 2 == 0)
                cy.get('#setHour').click().type(time + ":00")
            else
                cy.get('#setHour').click().type(time + ":30")

            cy.get('.d-flex > .btn').click()
            for (let i = 1; i <= 46; i++) {
                cy.get(':nth-child(' + i + ') > .card-body')
                    .should('exist')
            }
        }
    })
*/
    it('a client should be able to search a product', () => {

        //CORRECT SEARCHING
        //Search a product
        cy.get('.im-search_input').type('Chicken', { force: true })
        //Checking the component exist
        cy.get('.card-body').should('exist').should('contain.text', "Chicken")

        //WRONG SEARCHING
        //Search a product
        cy.get('.im-search_input').clear({ force: true }).type('Chickens', { force: true })
        //Checking the component exist
        cy.findByText(/chicken/i).should('not.exist')

        //ANY ELEMENT IS SHOWN && CHECK UPPER/LOW_CASE
        cy.get('.im-search_input').clear({ force: true }).type('ch')
        cy.findByText(/cheese/i).should('exist')
        cy.findByText(/pistachio/i).should('exist')
        cy.findByText(/zucchini/i).should('exist')
        cy.findByText(/chicken/i).should('exist')
        cy.findByText(/peach/i).should('exist')


    })

    it('a shop Employee should be able to view the rigth quantity(After a farmer update)', () => {
        //1 SEARCH
        //Search a product
        cy.get('.im-search_input').type('Zucchini', { force: true })
        //Checking the component exist
        cy.get('.card-body').should('exist').should('include.text', '150 left of 150 available')
    })

    it('a shop Employee should be able to view the rigth quantity(After a client purchase)', () => {
        //1 SEARCH
        //Search a product
        cy.get('.im-search_input').type('egg', { force: true })
        //Checking the component exist
        cy.get('.card-body').should('exist').should('include.text', '98 left of 100 available')
    })


})