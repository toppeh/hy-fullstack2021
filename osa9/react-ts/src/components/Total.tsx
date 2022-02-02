import React from "react";
import { Course } from "../types";

interface TotalProps {
  courses: Course[]
}

export const Total = (props: TotalProps) => {
  return (
    <p>Number of exercises{' '}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}