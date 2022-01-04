/* eslint-disable */
let bloglist = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

const blog = {
  title: "Kuinka testata React-fronttia",
  author: "Matti Meikäläinen",
  url: "https://testaaminen.on.kivaa",
  likes: "42",
}

let allBlogs = [...bloglist]
allBlogs.push(blog)
const sortedBlogs = allBlogs.sort((a, b) => {
  return a.likes < b.likes
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
            name: 'Erkki Esimerkki',
            username: 'kiiski',      
            password: 'verynice'    
          }    
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('kiiski')
      cy.get('#password').type('verynice')
      cy.get('#login-button').click()
      cy.contains('Erkki Esimerkki logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('kiiski')
      cy.get('#password').type('notverynice')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Erkki Esimerkki logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('kiiski', 'verynice')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Kuinka testata React-fronttia')
      cy.get('#author').type('Matti Meikäläinen')
      cy.get('#url').type('https://testaaminen.on.kivaa')
      cy.contains('create').click()
      cy.get('#bloglist').should('contain', 'Kuinka testata React-fronttia')
    })

    describe('When blogs have been created', function() {
      beforeEach(function() {
        cy.createBlog(blog)
        bloglist.forEach(blog => cy.createBlog(blog))
      })
      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('43')
      })
      it('A blog can be removed', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('#bloglist').should('not.contain', 'Kuinka testata React-fronttia')
      })
      it.only('Blogs are ordered by likes', function() {
        cy.get('.viewBtn').click({ multiple: true })
        cy.get('#bloglist .likes').each((blog, index) => {
          cy.wrap(blog).should('contain.text', allBlogs[index].likes)
        })
        cy.get('#bloglist .likes .likeBtn').last().click()
        cy.get('#bloglist .likes .likeBtn').last().click()
        cy.get('#bloglist .likes .likeBtn').last().click()
        cy.get('#bloglist .likes').last().contains(2)
      })
    })
  })
})
