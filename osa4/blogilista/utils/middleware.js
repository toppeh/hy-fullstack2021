const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = await User.findById(decodedToken.id)
  next()
}
/* eslint-disable-next-line consistent-return */
const errorHandler = (error, request, response, next) => {
  switch (error.name) {
  case 'ValidationError':
    return response.status(400).send({
      error: error.message,
    })
  case 'JsonWebTokenError':
    return response.status(401).send({
      error: 'token missing or invalid',
    })
  default:
    console.log(error)
    next(error)
  }
}

module.exports = {
  requestLogger, tokenExtractor, userExtractor, errorHandler,
}
