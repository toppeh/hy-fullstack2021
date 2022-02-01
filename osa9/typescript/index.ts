import express from 'express';
import { calculateBmi } from './src/bmiCalculator';
import { calculateExercises, Result } from './src/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)){
    res.status(400).json({ error: 'malformatted parameters'});
  } else {
    const bmi: string = calculateBmi(height, weight);
    res.json({
      height: height,
      weight: weight,
      bmi: bmi 
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing'});
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!Array.isArray(daily_exercises) || daily_exercises.some((hour: any) => isNaN(Number(hour))) || isNaN(Number(target)) ){
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }
  // Since @typescript-eslint/no-unsafe-argument is enforced, convert Array<any> to Array<number>, even though it's not needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hours: number[] = daily_exercises.map((hour: any) => Number(hour));
  const numberTarget = Number(target);
  const result: Result = calculateExercises(hours, numberTarget);
  res.json(result);
}); 

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});