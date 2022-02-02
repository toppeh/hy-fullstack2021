import React from "react";
import { CoursePart } from '../types'

const style = {
  padding: "1px"
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({course}: {course: CoursePart}) => {
  switch (course.type) {
    case 'normal':
      return (
        <div style={style}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
        </div>
      );

    case 'groupProject':
      return (
        <div style={style}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p>Group projects: {course.groupProjectCount}</p>
        </div>
      );

    case 'submission':
      return (
        <div style={style}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          <p><i>{course.description}</i></p>
          <p>Submission link: {course.exerciseSubmissionLink}</p>
        </div>
      );
    
    case 'special':
      return (
        <div style={style}>
          <p><b>{course.name} {course.exerciseCount}</b></p>
          Requirements:
          <ul>
            {course.requirements.map((requirement: string) => 
              <li key={requirement}>
                {requirement}
              </li>
            )}
          </ul>
        </div>
      );

    default:
      return assertNever(course);
  }
}