import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from 'react-router-dom'
import {
  Button,
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap'

import { checkLocalStorage, logout } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLocalStorage(storage.loadUser()))
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const history = useHistory()
  const userLoggedin = useSelector(state => state.currentUser)

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
    history.push('/login')
  }

  const isAuth = storage.loadUser() ? true : false

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }

  const navBar = { 
    padding: 5,
    color: 'white' }

  const background = {
    backgroundColor: 'black'
  }

  return (
    <Container style={background}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" variant="pills" defaultActiveKey="/blogs">
            <Nav.Item>
              <Nav.Link href="#" eventKey="/blogs" as="span"><Link style={navBar} to="/blogs">Blogs</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#" eventKey="/users" as="span"><Link style={navBar} to="/users">Users</Link></Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            {userLoggedin &&
              <Navbar.Text>
              Signed in as {userLoggedin.name} <Button variant="danger" onClick={handleLogout}>logout</Button>
            </Navbar.Text>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification />
      <Switch>
        <PrivateRoute path="/users/:id">
          <UserDetail />
        </PrivateRoute>
        <PrivateRoute path="/blogs/:id">
          <BlogDetail />
        </PrivateRoute>
        <PrivateRoute path="/users/">
          <UserList />
        </PrivateRoute>
        <Route path="/login/">
          <LoginForm />
        </Route>
        <PrivateRoute path="/blogs">
          <BlogList /> 
        </PrivateRoute>
        <PrivateRoute path="/">
          <BlogList />
        </PrivateRoute>
      </Switch>
      <Footer />
    </Container>
  )
}

export default App