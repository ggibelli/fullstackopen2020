const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog){
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const blog  = new Blog(req.body)
  const decodedToken = jwt.verify(req.token, config .SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  blog.user = user
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const decodedToken = jwt.verify(req.token, config .SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const comment = req.body
  blog.comments.push(comment)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config .SECRET)
  const blog = await Blog.findById(req.params.id)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'only blog creator can remove blog' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(blog => blog.id.toString() !== req.params.id.toString())
  await user.save()
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

module.exports = blogsRouter