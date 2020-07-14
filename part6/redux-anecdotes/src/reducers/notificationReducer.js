const reducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return {
      data: action.data,
      visibility: true
    }
  case 'HIDE':
    return {
      data: '',
      visibility: false
    }
  default:
    return state
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

const notificationAnecdote = (anecdote) => {
  return {
    type: 'NOTIFICATION',
    data: anecdote
  }
}

export const notificationWithTimeout = (text, time) => {
  return dispatch => {
    dispatch(notificationAnecdote(text))
    setTimeout(() => dispatch(hideNotification()), time * 1000)
  }
}

export default reducer