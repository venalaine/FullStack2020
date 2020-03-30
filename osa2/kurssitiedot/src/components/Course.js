import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
        <TotalExercises parts={parts} />
      </div>
    )
  
  }
  
  const Part = ({ part }) => {
    return (
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const TotalExercises = ( { parts } ) => {
  const total = parts.reduce((prevValue, currentValue) => prevValue + currentValue.exercises, 
  0
  );
  return <p><b>Total of {total} exercises</b></p>
  
  }

  export default Course