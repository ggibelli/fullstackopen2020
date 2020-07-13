const reducer = (state = '', action) => {
  switch (action.type) {
  case 'VOTED':
    return {
      data: `You voted ${action.data}`,
      visibility: true
    }
  case 'ADDED':
    return {
      data: `You added ${action.data}`,
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

export const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

export const notificationAnecdote = (anecdote) => {
  return {
    type: 'ADDED',
    data: anecdote
  }
}

export const notificationVote = (anecdote) => {
  return {
    type: 'VOTED',
    data: anecdote.content
  }
}

export default reducer