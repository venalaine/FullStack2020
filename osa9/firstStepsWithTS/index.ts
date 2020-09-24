import express from 'express';
const app = express();
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (reg, res) => {

  try {
    const object = {
      weight: reg.query.weight,
      height: reg.query.height,
      bmi: calculateBMI(Number(reg.query.height), Number(reg.query.weight))
    };

    res.send(object);

  } catch {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exercises: Array<number> = Array<number>(req.body.daily_exercises);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target);

    if (!exercises || !target) {
      res.status(400).send({ error: 'parameters missing' });
    } else if (isNaN(Number(target))) {
      res.status(400).send({ error: 'malformatted parameters' });
    }

    for (let i = 0; i < exercises.length; i++) {
      if (isNaN(Number(exercises[i]))) {
        res.status(400).send({ error: 'malformatted parameters' });
      }
    }

    const result = calculateExercises(exercises, target);
    res.send(result);
  
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
