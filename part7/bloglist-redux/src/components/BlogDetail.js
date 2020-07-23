import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory, useParams } from 'react-router-dom'
import { BoxLoading } from 'react-loadingg'
import { Button, Col, Row, Form } from 'react-bootstrap'

import helpers from '../utils/helpers'

const BlogDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === id))
  
  const handleLikeblog = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(likedBlog))
    dispatch(setNotification({ message: `You liked ${blog.title}`, type: 'success' }, 5))
  }

  const handleDeleteBlog = () => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification({ message: `You removed ${blog.title}`, type: 'warning' }, 5))
    history.push('/blogs')
  }

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    const commentedBlog = await helpers.newComment(comment, blog.id)
    if (!commentedBlog.error) {
      dispatch(commentBlog(commentedBlog))
      document.querySelectorAll('input').forEach(input => input.value = '')
      dispatch(setNotification({ message: `new comment ${comment} added`, type: 'success' }, 5))
    } else {
      dispatch(setNotification({ message: `${commentedBlog.error}`, type: 'danger' }, 5))
    }
    
  }
  if (blog) {
    const style = {
      backgroundColor: '#121212'
    }
    return (
      <div style={style} className="container">
        <Row>
          <Col>
            <h2>{blog.title} {blog.author}</h2>
            to read the full blog post <a href="#">{blog.url}</a>
            <div>{blog.likes} likes <Button variant="dark" onClick={handleLikeblog}>LIKE</Button></div>
            <div>added by {blog.user.username}</div>
            { currentUser.username === blog.user.username &&
              <Button variant="secondary" onClick={handleDeleteBlog}>REMOVE</Button>
            }
          </Col>
        </Row>
        <Row>
          <Col> 
          <h3>comments</h3>
            <Form id="comments" onSubmit={addComment}>
              <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  name="comment"
                />
                <Button variant="dark" type="submit">comment!</Button>
              </Form.Group>
            </Form>
            <ul>
              { blog.comments.map(comment => 
                <li key={comment._id}>
                  {comment.comment}
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
  return (
    <div>
      <BoxLoading />
    </div>
  )
}

export default BlogDetail