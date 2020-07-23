import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BoxLoading } from 'react-loadingg'

const UserDetail = () => {
  const { id } = useParams()
  const user = useSelector(({ users }) => users.find(user => user.id === id))
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h4>Blogs created</h4>
        <ul>
          {user.blogs.map(blog => 
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
  return (
    <div>
      <BoxLoading />
    </div>
  )
}

export default UserDetail