import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Content = (props) => {
    console.log(props);
  return (
    <div>
      <Part name={props.course.parts[0].name} exer={props.course.parts[0].exercises}/>
      <Part name={props.course.parts[1].name} exer={props.course.parts[1].exercises}/>
      <Part name={props.course.parts[2].name} exer={props.course.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p><b>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</b></p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exer}</p>
    </div>
  )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header header={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))