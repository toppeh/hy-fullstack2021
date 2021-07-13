import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({header}) => <h1>{header}</h1>

const Button = ({text, eventHandler}) => {
  return (
    <button onClick={eventHandler}>{text}</button>
  )
}

const totalSum = (amounts) => amounts[0] + amounts[1] + amounts[2]

const average = (amounts) => (amounts[0] + (-1 * amounts[2])) / totalSum(amounts)

const positives = (amounts) => {
  let pos = amounts[0]/totalSum(amounts)*100
  pos = pos.toString()+"%"
  return pos
}
const Statistics = ({amounts}) => {
  if (totalSum(amounts) === 0) return <p>No feedback given</p>
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={amounts[0]} />
          <StatisticLine text="neutral" value ={amounts[1]} />
          <StatisticLine text="bad" value ={amounts[2]} />
          <StatisticLine text="all" value ={totalSum(amounts)} />
          <StatisticLine text="average" value ={average(amounts)} />
          <StatisticLine text="positive" value ={positives(amounts)} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const amounts = [good, neutral, bad]

  const handleGood = () => (setGood(good +1))

  const handleNeutral = () => (setNeutral(neutral +1))

  const handleBad = () => (setBad(bad +1))

  return (
    <div>
      <Header header="feedback" />
      <Button text="good" eventHandler={handleGood} />
      <Button text="neutral" eventHandler={handleNeutral} />
      <Button text="bad" eventHandler={handleBad} />
      <Header header="stats" />
      <Statistics amounts={amounts} />
    </div>
  )
}

export default App