import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  console.log(props)
  if (props.allClicks.length === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text='good' value={props.data.good} />
        <Statistic text='neutral' value={props.data.neutral} />
        <Statistic text='bad' value={props.data.bad} />
        <Statistic text='all' value={props.allClicks.length} />
        <Statistic text='average' value={props.data.average} />
        <Statistic text='positive' value={props.data.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks.concat(1))
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks.concat(0))
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks.concat(-1))
  }

  const average = allClicks.reduce((a, b) => a + b, 0) / allClicks.length
  const positive = (allClicks.filter(el => el === 1).reduce((a, b) => a + b, 0) * 100 / allClicks.length) + '%'
  const data = {good:good, neutral:neutral, bad:bad, average:average, positive:positive}

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header text='statistics' />
      <Statistics allClicks={allClicks} data={data}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
