import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Form from './components/Form'
import Header from './components/Header'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [browserMessage, setBrowserMessage] = useState({ message:'', type:'' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
              
      setBlogs(blogs.concat(returnedBlog))
      setBrowserMessage({message:
        `A new blog '${newBlogTitle}' by ${newBlogAuthor}`, type: 'success'
      })
      setTimeout(() => {
        setBrowserMessage({message:'', type:''})
      }, 5000) 
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    
    } catch (exception) {
    console.log(exception.response.data)
    setBrowserMessage({message:
      exception.response.data.error, type: 'error'
    })
    setTimeout(() => {
      setBrowserMessage({message:'', type:''})
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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setBrowserMessage({ message:'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setBrowserMessage({message:'', type:''})
      }, 5000)
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleAddTitle = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAddAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleAddUrl = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleInputsLoginForm = [
    { text: 'username', handler: handleUsername, value: username }, 
    { text: 'password', handler: handlePassword, value: password }
  ] 
  const handleInputsCreateForm = [
    { text: 'Title', handler: handleAddTitle, value: newBlogTitle }, 
    { text: 'Author', handler: handleAddAuthor, value: newBlogAuthor }, 
    { text: 'Url', handler: handleAddUrl, value: newBlogUrl }
  ]

  const loggedPage = () => (
    <>
    <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
    <Form formHandler={addBlog} addInputs={handleInputsCreateForm} text={'create'} />
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
        : <Form formHandler={handleLogin } addInputs={handleInputsLoginForm} text='login' />
      }
    </div>
  )
}

export default App