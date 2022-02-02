import React from "react";
import { CoursePart } from '../types';
import { Part } from './Part';

interface ContentProps {
  courses: CoursePart[]
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map(
        (course: CoursePart) => 
          <Part key={course.name} course={course} />
      )}
    </div>
  )
}