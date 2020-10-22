import React from 'react';
import Part from './Part'
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  
  return (
    <>
      {courseParts.map((part: CoursePart) =>
      <Part key={part.name} part={part} />)}
    </>
  )
}

export default Content
