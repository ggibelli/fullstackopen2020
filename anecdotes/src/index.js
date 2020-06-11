import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.text}</h1>

const Anectode = (props) => (
  <div>
    <p>{props.anecdote}</p>
    <Vote votes={props.votes} />
  </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Vote = (props) => (
  <p>has {props.votes} votes</p>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const indexOfMaxValue = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  return (
    <>
    <Header text='Anectode of the day' />
    <Anectode anecdote={props.anecdotes[selected]} votes={votes[selected]} />
    <Button handleClick={()=> setSelected(Math.floor(Math.random() * 6))} text='next anectode' />
    <Button handleClick={handleClickVote} text='vote' />
    <Header text='Anectode with the most votes' />
    <Anectode anecdote={props.anecdotes[indexOfMaxValue]} votes={votes[indexOfMaxValue]} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

