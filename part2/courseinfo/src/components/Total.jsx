import React from 'react'

const Total = ({ parts }) => {
    
    const total = parts.reduce((sum, part) =>{
        console.log('calculate', sum, part.exercises)
        return sum + part.exercises
    },0);

    return (
        <p>total of {total} exercises</p>
    )
};

export default Total;
