const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned ones', async () => {
  const res = await api.get('/api/blogs')

  const authors = res.body.map(r => r.author)

  expect(authors).toContain('Robert C. Martin')
})

test('a valid blog can be added', async () => {
  const newblog = {
    title: 'coolblog',
    author: 'Robert C. Martin',
    url: 'www.google.com'
  }

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(b => b.author)
  expect(authors).toContain(
    'Robert C. Martin'
  )
})

test('blog without likes has default 0', async () => {
  const newblog = {
    title: 'coolblog',
    author: 'Robert C. Martin',
    url: 'www.google.com'
  }

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContain(
    0
  )
})

test('blog without title and url responde 400', async () => {
  const newblog = {
    author: 'Robert C. Martin',
  }

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be viewed and has id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]
  const resultBlog = await api  .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(resultBlog.body.id).toBeDefined()
  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes:  blogToUpdate.likes + 1
  }


  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const like = blogsAtEnd[0].likes
  expect(like).toBe(blogToUpdate.likes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})

