import React from 'react';

const Header = ({course}) => {
  return <h2>{course}</h2>
}
  
const Part = ({part, exercise}) => {
  return <p>{part} {exercise}</p>
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercise={part.exercises}/>
      )}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.map(el => el.exercises).reduce((a, b)=> a + b)
  return <strong>Total of {total} exercises</strong>
}

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )
}

export default Course