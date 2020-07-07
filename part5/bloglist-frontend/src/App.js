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

  const addBlog = async (blogObject) => {
    BlogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      setBrowserMessage({ message:
        `A new blog '${returnedBlog.title}' by ${returnedBlog.author}`, type: 'success'
      })
      setTimeout(() => {
        setBrowserMessage({ message:'', type:'' })
      }, 5000)

    } catch (exception) {
      setBrowserMessage({ message:
      exception.response.data.error, type: 'error'
      })
      setTimeout(() => {
        setBrowserMessage({ message:'', type:'' })
      }, 5000)
      setBlogs(blogs)
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
      setBrowserMessage({ message:
        `${username} successfully loggedin`, type: 'success'
      })
      setTimeout(() => {
        setBrowserMessage({ message:'', type:'' })
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setBrowserMessage({ message:'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setBrowserMessage({ message:'', type:'' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loggedPage = () => (
    <>
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog post" ref={BlogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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