import React from 'react'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  const vote = (object) => {
    const votedAnecdote = { ...object, votes: object.votes + 1 }
    props.voteAnecdote(object.id, votedAnecdote)
    props.notificationWithTimeout(`You voted ${object.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  return {
    anecdotes: sortedAnecdotes
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notificationWithTimeout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)