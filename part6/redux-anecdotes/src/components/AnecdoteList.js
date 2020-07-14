import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationWithTimeout } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} <button onClick={handleClick}>vote</button></div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const vote = (object) => {
    const votedAnecdote = { ...object, votes: object.votes + 1 }
    dispatch(voteAnecdote(object.id, votedAnecdote))
    dispatch(notificationWithTimeout(`You voted ${object.content}`, 5))
  }
  const filteredAnecdoted = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const sortedAnecdotes = filteredAnecdoted.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList