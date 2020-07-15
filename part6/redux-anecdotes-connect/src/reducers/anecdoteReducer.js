import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  case 'VOTE': {
    const id = action.data.id
    const votedAnecdote = action.data
    return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
  }
  default:
    return state
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id, anecdoteVoted) => {
  return async dispatch => {
    const voted = await anecdoteService.updateAnecdote(id, anecdoteVoted)
    dispatch({
      type: 'VOTE',
      data: voted
    })
  }
}

export default reducer