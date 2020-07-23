import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const BlogList = () => {
  
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = React.createRef()
  const initialBlogs = useRef(0)

  useEffect(() => {
    if (initialBlogs.current === 0) {
      initialBlogs.current = blogs.length
    } else if (initialBlogs.current <= blogs.length) {
      initialBlogs.current = blogs.length
      blogFormRef.current.toggleVisibility()
    }}, [blogs, blogFormRef])

  return (
    <>
    <div>
      <Togglable buttonLabel="new blog post" headerLabel="new blog post" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    </div>
    <div>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Title and Author</th>
          <th>Added by</th>
        </tr>
      </thead>
      <tbody>
      {blogs.map(blog =>
      <tr key ={blog.id}>
        <td><Link to={`/blogs/${blog.id}`}>{blog.title}, by {blog.author}</Link></td>
        <td>{blog.user.username}</td>
      </tr>
      )}
      </tbody>
    </Table>
    </div>
    </>
  )
}

export default BlogList