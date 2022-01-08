const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  return response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request
  // if (!user) return response.status(401)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id, // eslint-disable-line no-underscore-dangle
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id) // eslint-disable-line no-underscore-dangle
  await user.save()
  return response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request
  const toDelete = await Blog.findById(request.params.id)
  if (!toDelete) return response.status(404).end()
  if (toDelete.user.toString() === user.id) {
    // authorization succeeded, delete the blog
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  // authorization did not succeed
  return response.status(401).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (!updatedNote) return response.status(404).end()
  return response.json(updatedNote)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id })
  return response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = new Comment({
    content: request.body.content,
    blog: request.params.id,
  })
  const postedComment = await comment.save()
  if (!postedComment) return response.status(500).end()
  return response.json(postedComment)
})

module.exports = blogsRouter
