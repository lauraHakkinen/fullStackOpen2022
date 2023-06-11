describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'testing123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function() {
    cy.contains('Bloglist')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Logging in', function() {

    it('succeeds with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('test')
      cy.get('#password').type('testing123')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('test2')
      cy.get('#password').type('testing123')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.login({ username: 'test', password: 'testing123' })
    })

    it('a new blog can be created', function() {
      cy.contains('Test User logged in')
      cy.contains('add a new blog').click()
      cy.get('#author').type('Tester')
      cy.get('#title').type('Test blog')
      cy.get('#url').type('test.fi')
      cy.get('#submit-button').click()

      cy.contains('Blog Test blog was added to the list')
      cy.contains('Test blog by Tester')
    })

    it('a blog can be liked', function() {
      cy.createBlog({
        title: 'Test Blog 2',
        author: 'Testing2',
        url: 'tt.com'
      })

      cy.contains('Test Blog 2').parent().find('button').contains('view').click()
      cy.get('#like-button').click()
      cy.contains('1 people have liked this blog')
    })

    it('a blog can be removed', function() {
      cy.createBlog({
        title: 'Test Blog 2',
        author: 'Testing2',
        url: 'tt.com'
      })

      cy.contains('Test Blog 2').parent().find('button').contains('view').click()
      cy.get('#remove-button').click()

      cy.get('.error').contains('Deleted a blog called Test Blog 2')
    })

    it('only person who added blog can remove it', function() {
      cy.createBlog({
        title: 'Test Blog 2',
        author: 'Testing2',
        url: 'tt.com'
      })

      cy.contains('Log out').click()

      // log in with different user
      const user2 = {
        name: 'User Test',
        username: 'test2',
        password: '00000'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.login({ username: 'test2', password: '00000' })

      cy.contains('Test Blog 2').parent().find('button').contains('view').click()
      cy.get('#remove-button').click()

      // button shows but user is not allowed to delete the blog
      cy.get('.error').contains('An error occured while trying to delete blog')
    })

    it('blogs are displayed by raking their likes', function() {

      cy.createBlog({
        title: 'Test Blog 1',
        author: 'Testing1',
        url: 'tt1.com'
      })

      cy.createBlog({
        title: 'Test Blog 2',
        author: 'Testing2',
        url: 'tt2.com'
      })

      cy.createBlog({
        title: 'Test Blog 3',
        author: 'Testing3',
        url: 'tt3.com'
      })

      cy.get('.blog').eq(0).contains('Test Blog 1')
      cy.get('.blog').eq(1).contains('Test Blog 2')
      cy.get('.blog').eq(2).contains('Test Blog 3')

      // liking the Blog 3 three times
      cy.contains('Test Blog 3').parent().find('button').contains('view').click()
      cy.contains('tt3.com').parent().find('#like-button').contains('like').click()
      cy.contains('tt3.com').parent().find('#like-button').contains('like').click()
      cy.contains('tt3.com').parent().find('#like-button').contains('like').click()

      // liking the Blog 1 two times
      cy.contains('Test Blog 1').parent().find('button').contains('view').click()
      cy.contains('tt1.com').parent().find('#like-button').contains('like').click()
      cy.contains('tt1.com').parent().find('#like-button').contains('like').click()

      // liking the Blog 2 one times
      cy.contains('Test Blog 2').parent().find('button').contains('view').click()
      cy.contains('tt2.com').parent().find('#like-button').contains('like').click()

      // check that blogs are in right order
      cy.get('.blog').eq(0).contains('Test Blog 3')
      cy.get('.blog').eq(1).contains('Test Blog 1')
      cy.get('.blog').eq(2).contains('Test Blog 2')
    })
  })
})