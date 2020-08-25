describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Teppo Testaaja',
      username: 'teppo',
      password: 'teppo'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('teppo')
      cy.get('#password').type('teppo')
      cy.get('#login-button').click()

      cy.contains('Teppo Testaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('seppo')
      cy.get('#password').type('teppo')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(0, 0, 255)')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('teppo')
      cy.get('#password').type('teppo')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#create-new-button').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type('Teppo')
      cy.get('#url').type('www.example.fi')

      cy.get('#add-button').click()

      cy.contains('Test title')
      cy.get('#view-button')
    })

    it('A blog can be liked', function() {

      cy.get('#create-new-button').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type('Teppo')
      cy.get('#url').type('www.example.fi')

      cy.get('#add-button').click()

      cy.get('#view-button').click()

      cy.get('#like-button').click()

      cy.contains('1 likes')

    })

    it('A blog can be deleted', function() {

      cy.get('#create-new-button').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type('Teppo')
      cy.get('#url').type('www.example.fi')

      cy.get('#add-button').click()

      cy.get('#view-button').click()

      cy.get('#delete-button').click()

      cy.get('html').should('not.contain', 'Test title')

    })

    it('Blogs are ordered based on likes', function() {

      cy.get('#create-new-button').click()
      cy.get('#title').type('First Blog')
      cy.get('#author').type('Teppo')
      cy.get('#url').type('www.firstblog.fi')
      cy.get('#add-button').click()

      cy.get('#title').type('Second Blog')
      cy.get('#author').type('Teppo')
      cy.get('#url').type('www.secondblog.fi')
      cy.get('#add-button').click()

      cy.get('#closedBlog').contains('View').click()
      cy.get('#closedBlog').contains('View').click()

      cy.contains('First Blog').parent().find('#hide-button').click()

      cy.get('#like-button').as('btnlike')
      cy.get('@btnlike').click()
      cy.get('@btnlike').click()

      cy.get('#closedBlog').contains('View').click()

      cy.get('#openedBlog').contains('2 likes')

    })

  })

})