import { useState } from "react";

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good * 1) + (neutral * 0) + (bad * -1)/ total;
  const positiveReviews = (good / total) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral {neutral}:</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average:{average}</p>
      <p>Positive:{positiveReviews}</p>
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
