import { useState } from "react";

const StatisticLine = ({ value, text }) => {
  const content = text === 'Positive'
    ? <tr>
        <th>{text}</th>
        <td>{value}%</td>
      </tr>
    : <tr>
        <th>{text}</th>
        <td>{value}</td>
      </tr>
    
  return (
    content
  )
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1) + (neutral * 0) + (bad * -1)/ total;
  const positiveReviews = (good / total) * 100;

  const content = total === 0 
    ? <p>No Feedback Given</p>
    : <table>
        <tbody>
          <StatisticLine value={good} text='Good' />
          <StatisticLine value={neutral} text='Neutral' />
          <StatisticLine value={bad} text='Bad' />
          <StatisticLine value={total} text='All' />
          <StatisticLine value={average ? average : 0} text='Average' />
          <StatisticLine value={positiveReviews ? positiveReviews : 0} text='Positive' />
        </tbody>
      </table>

  return (
    <div>
      <h2>Statistics</h2>
      {content}
    </div>
  )
};

const Button = ({ initial, setInitial, text }) => {
  const handleClick = () => {
    setInitial(initial + 1)
  };

  return (
    <button onClick={handleClick}>{text}</button>
  )
};


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button initial={good} setInitial={setGood} text='Good' />
      <Button initial={neutral} setInitial={setNeutral} text='Neutral' />
      <Button initial={bad} setInitial={setBad} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
