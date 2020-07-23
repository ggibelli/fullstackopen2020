import blogService from '../services/blogs'

const byVotes = (a, b) => b.likes - a.likes
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE': {
      const liked = action.data
      return state.map(blog => blog.id === liked.id ? liked : blog).sort(byVotes)
    }
    case 'COMMENT': {
      const commented = action.data
      return state.map(blog => blog.id === commented.id ? commented : blog).sort(byVotes)
    }
    case 'DELETE': {
      const idDeleted = action.data
      return state.filter(blog => blog.id !== idDeleted).sort(byVotes)
    }
    default:
      return state
  }
}

export const createBlog = data => {
  return async dispatch => {
    dispatch({
      type: 'NEW_BLOG',
      data
    })
  }
}

export const commentBlog = data => {
  return async dispatch => {
    dispatch({
      type: 'COMMENT',
      data
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update({ ...blog, user: blog.user.id })
    dispatch({
      type: 'LIKE',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog.id
    })
  }
}

export default reducer