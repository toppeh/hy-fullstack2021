import React from 'react'

const Course = ({ course }) => {
    return (
      <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>)
  }
  
  const Header = (props) => (
    <h1>{props.course}</h1>
  )
  
  const Part = ({ name, exercises }) => (
    <p>{name} {exercises}</p>
  ) 
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
            <Part key={part.id}
                  name={part.name}
                  exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => (
    <p>Total of {parts.reduce((total, current) => total + current.exercises, 0)} exercises</p>
  )

  export default Course