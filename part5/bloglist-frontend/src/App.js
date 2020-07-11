import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import Header from './components/Header'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [browserMessage, setBrowserMessage] = useState({ message:'', type:'' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const BlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedonUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedonUserJSON) {
      const user = JSON.parse(loggedonUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setBrowserMessage({ message, type })
    setTimeout(() => {
      setBrowserMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      BlogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`A new blog '${returnedBlog.title}' by ${returnedBlog.author}`)
    } catch (exception) {
      notifyWith(`${exception.response.data.error}`, 'error')
      setBlogs(blogs)
    }
  }

  const handleLikes = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    try {
      const returnedBlog = await blogService.update(id, likedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...returnedBlog, user: blog.user }))
    } catch (exception) {
      notifyWith(`${exception.response.data.error}`, 'error')
      setBlogs(blogs)
    }
  }

  const deleteBlog = async (id) => {
    const toDelete = blogs.find(b => b.id === id)
    const ok = window.confirm(`Delete ${toDelete.title}`)
    if (ok) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        notifyWith(`Deleted ${toDelete.title}`)
      } catch (exception) {
        setBlogs(blogs.filter(b => b.id !== id))
        notifyWith(`${exception.response.data.error}`, 'error')
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notifyWith(`${username} successfully loggedin`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes).reverse()

  const loggedPage = () => (
    <>
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog post" ref={BlogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={deleteBlog} myBlog={user.username === blog.user.username}/>
      )}
    </>
  )

  return (
    <div>
      <Header text={ user ? 'Blogs' : 'Login to application' } user={user} />
      <Notification message={browserMessage} />
      { user
        ? loggedPage()
        : <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      }
    </div>
  )
}

export default App