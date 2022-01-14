const { UserInputError, AuthenticationError } = require('apollo-server')
const { JsonWebTokenError } = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      filter = args.genre ? {...filter, genres: { $in: [args.genre] }} : filter
      return Book.find(filter).populate("author")
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => Book.find({ author: root.id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser){
        throw new AuthenticationError("Invalid authorization token")
      }
      let author = await Author.find({
        name: args.author
      })
      if (author.length > 0){
        author = author[0]
      } else {
        author = new Author({ 
          name: args.author,
          born: null })
        try {
          await author.save()
        } 
        catch (error) { 
          throw new UserInputError(error.message, {
          invalidArgs: { name: author.name } 
          })
        }
      }
      const book = new Book({ ...args, author: author._id })
      try { 
        await book.save()
        return book
      } 
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { title: book.title }
          })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser){
        throw new AuthenticationError("Invalid authorization token")
      }
      const author = await Author.find( {name: args.name })
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(
          author[0]._id,
          { born: args.setBornTo },
          { new: true})
        return updatedAuthor
      } 
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { setBornTo: args.setBornTo }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      
      return user.save().catch((error) => {
        throw new UserInputError(error.message)
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "verynice") {
        throw new UserInputError("wrong credentials")
      }
      return {
        value: jwt.sign({
          username: user.username,
          id: user._id
        }, 
        process.env.JSON_SECRET)
      }
    },
  }
}

module.exports = resolvers