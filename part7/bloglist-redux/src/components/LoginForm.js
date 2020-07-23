import React from 'react'
import { useDispatch } from 'react-redux'
import { loginRedux } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import storage from '../utils/storage'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await storage.loginUser({
        username, password
      })
      document.querySelectorAll('input').forEach(input => input.value = '')
      dispatch(loginRedux(user))
      history.push('/blogs')
      dispatch(setNotification({ message: `welcome back ${user.username}`, type: 'success' }, 5))
    } catch {
      dispatch(setNotification({ message: 'wrong username/password', type: 'danger' }, 5))
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
          />
          <Button variant="dark" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm