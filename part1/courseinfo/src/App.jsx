import React from 'react'

const Header = (props) => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  )
};

const Part = (props) => {
  return (
    <p>{props.part} {props.ex}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].part} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].part} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].part} exercises={props.parts[2].exercises}/>
    </div>
  )
};

const Total = (props) => {
  const total = props.parts.map(part => part.exercises).reduce((sum, value) => sum + value)
  console.log(total)

  return (
    <p>Number of exercises {total}</p>
  )
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'Using props to pass data',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
