describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Giovanni',
      username: 'root',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#login-form')
  })

  describe('login', function() {
    it('succeds with right credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Giovanni logged-in')
    })

    it('login fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Giovanni-logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'secret' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog post').click()
      cy.get('#title').type('blog by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.contains('save').click()
      cy.contains('blog by cypress Cypress')
    })
    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog',author: 'cypress', url: 'www.ggg.it', likes: '100' })
        cy.createBlog({ title: 'second blog',author: 'cypress', url: 'www.ggg.it', likes: '40' })
        cy.createBlog({ title: 'third blog',author: 'cypress', url: 'www.ggg.it', likes: '300' })
      })

      it('one of those can be liked', function() {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').parent().parent().contains('like').click()
        cy.contains('likes: 41')
      })

      it('one of those can be deleted', function() {
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').parent().parent().contains('remove').click()
        cy.get('html').should('not.contain', 'second blog cypress')
        cy.contains('Deleted second blog')
      })

      it('only creator can delete their own blog', function() {
        const user = {
          name: 'Other',
          username: 'prova',
          password: 'cypress'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'prova', password: 'cypress' })
        cy.contains('second blog').parent().find('button').click()
        cy.contains('second blog').parent().parent().should('not.contain', 'remove')
      })

      it('blogs are ordered by likes', function() {
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'third blog cypress')
          cy.wrap(blogs[1]).should('contain', 'first blog cypress')
          cy.wrap(blogs[2]).should('contain', 'second blog cypress')
        })
      })
    })
  })
})