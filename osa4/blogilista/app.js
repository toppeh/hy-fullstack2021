const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const resetRouter = require('./controllers/reset')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

logger.info('connecting to mongodb')
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
}).then(() => logger.info('connected to mongodb'))

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', resetRouter)
}

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app
