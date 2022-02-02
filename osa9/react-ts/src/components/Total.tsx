import React from "react";
import { CoursePart } from "../types";

interface TotalProps {
  courses: CoursePart[]
}

export const Total = (props: TotalProps) => {
  return (
    <p>Number of exercises{' '}
      {props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}