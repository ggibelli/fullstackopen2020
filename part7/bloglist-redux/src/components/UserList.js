import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>User name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
      {users.map(user =>
      <tr key ={user.id}>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
      )}
      </tbody>
    </Table>
    </div>
  )
}

export default UserList