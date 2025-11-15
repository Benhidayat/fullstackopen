import { useState } from "react";

const Anecdotes = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </div>
  )
}

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));
  console.log(vote)

  const handleSelected = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newIndex);
  };

  const handleVote = (index) => {
    const newVote = [...vote];
    newVote[index] = newVote[index] + 1;
    setVote(newVote);
  };

  // to find the anecdote with most vote
  // let mostVote = vote[0];
  // let voteId = 0;
  // for (let i =0; i < vote.length; i++) {
  //   if (vote[i] > mostVote) {
  //     mostVote = vote[i]
  //     voteId = i;
  //   }
  // }
  const voteId = vote.indexOf(Math.max(...vote));
  
  return (
    <div>
      {/* <h1>Anecdote of the day</h1> */}
      <Anecdotes title='Anecdote of the day' anecdote={anecdotes[selected]} votes={vote[selected]} />
      <Button onClick={() => handleVote(selected)} text='Vote' />
      <Button onClick={handleSelected} text='Next anecdote' />
      <Anecdotes title='Anecdote with most vote' anecdote={anecdotes[voteId]} votes={vote[voteId]} />
    </div>
  )
};

export default App;
