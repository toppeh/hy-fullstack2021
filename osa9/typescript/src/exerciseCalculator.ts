export interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string
}

type Rating = 1|2|3;

export const calculateExercises = (exerciseHours: number[], target: number): Result => {
  const days: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.reduce((count: number, hours: number) => hours ? count + 1 : count, 0);
  const sum: number = exerciseHours.reduce((prev: number, cur: number): number => prev + cur);
  const average: number = sum / days;
  let success = false;
  let rating: Rating = 1;
  if (average >= target) {
    success = true;
    rating = 3;
  } else if (target - average <= 0.5 ) {
    rating = 2;
  }
  let ratingDescription = '';
  switch (rating) {
    case 1:
      ratingDescription = 'target was not reached';
      break;
    
    case 2:
      ratingDescription = 'not too bad but could be better';
      break;

    case 3:
      ratingDescription = 'excellent work!';
      break;
    
    default:
      ratingDescription = 'something went wrong';
  }
  const result: Result = {
    periodLength: days,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
  return result;
};
/*
interface ExerciseValues {
  hours: number[];
  target: number;
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  args = args.slice(3);

  if (args.every((hour: string) => !isNaN(Number(hour)))){
    const hours: number[] = args.map((hour: string) => Number(hour));
    return {
      hours: hours,
      target: target
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

try {
  const { hours, target } = parseExerciseArguments(process.argv);
  const result: Result = calculateExercises(hours, target);
  console.log(result);

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//console.log(process.argv)
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));

//const target: number = Number(process.argv.pop())
*/
