import React from "react";
import { Course } from '../types'

interface ContentProps {
  courses: Course[]
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map(
        (course: Course) => 
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      )}
    </div>
  )
}