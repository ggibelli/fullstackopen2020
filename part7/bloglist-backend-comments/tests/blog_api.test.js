const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'rootgiovanni', passwordHash })
  await user.save()

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is some blogs already saved', () => {
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

  test('a specific blog can be viewed and has id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api  .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body.id).toBeDefined()
    expect(resultBlog.body).toEqual(blogToView)
  })

  test('a specific blog can be commented by logged in user', async () => {
    const user = await User.findOne({ username: 'rootgiovanni' })
    await bcrypt.compare('secret', user.passwordHash)
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, config .SECRET)
    const blogsAtStart = await helper.blogsInDb()
    const blogToComment = blogsAtStart[0]
    const comment = { comment: 'nice blog' }
    const resultBlog = await api .post(`/api/blogs/${blogToComment.id}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(comment)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    console.log(resultBlog.body)
    expect(resultBlog.body.comments[0].comment).toEqual(comment.comment)
  })

  test('a specific blog cannot be commented without token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToComment = blogsAtStart[0]
    const comment = { comment: 'nice blog' }
    const resultBlog = await api .post(`/api/blogs/${blogToComment.id}/comments`)
      .send(comment)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(resultBlog.body.error).toContain('invalid token')
    expect(blogsAtEnd[0].comments).toHaveLength(0)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const user = await User.findOne({ username: 'rootgiovanni' })
    await bcrypt.compare('secret', user.passwordHash)
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, config .SECRET)

    const newblog = {
      title: 'coolblog',
      author: 'Robert C. Martin',
      url: 'www.google.com',
      user: user
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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

  test('a valid blog cannot be added without a valid token', async () => {
    const user = await User.findOne({ username: 'rootgiovanni' })
    await bcrypt.compare('secret', user.passwordHash)
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, 'falso')

    const newblog = {
      title: 'coolblog',
      author: 'Robert C. Martin',
      url: 'www.google.com',
      user: user
    }

    const res = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newblog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    expect(res.body.error).toContain('invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('blog without likes has default 0', async () => {
    const user = await User.findOne({ username: 'rootgiovanni' })
    await bcrypt.compare('secret', user.passwordHash)
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, config .SECRET)

    const newblog = {
      title: 'coolblog',
      author: 'Robert C. Martin',
      url: 'www.google.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
    const user = await User.findOne({ username: 'rootgiovanni' })
    await bcrypt.compare('secret', user.passwordHash)
    const userForToken = {
      username: user.username,
      id: user._id
    }
    const token = jwt.sign(userForToken, config .SECRET)

    const newblog = {
      author: 'Robert C. Martin',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newblog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

test('a blog can be deleted', async () => {
  const user = await User.findOne({ username: 'rootgiovanni' })
  const newblog = {
    title: 'coolblog',
    author: 'Robert C. Martin',
    url: 'www.google.com',
    user: user
  }
  const blogTest = new Blog(newblog)
  await blogTest.save()
  await bcrypt.compare('secret', user.passwordHash)
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, config .SECRET)

  const blogToDelete = await Blog.findOne({ user: user })

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

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

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'rootgiovanni', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ggiova',
      name: 'gio gibe',
      password: 'segreta'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)

    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username exists already', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rootgiovanni',
      name: 'gio gibe',
      password: 'cazzimiei'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation fails with proper statuscode and message if username too short', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gi',
      name: 'gio gibe',
      password: 'secret'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: 'giovanni',
      name: 'gio gibe',
      password: 'gi'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})