import express from 'express';
const app = express();
import { calculateBMI } from './bmiCalculator';

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_reg, res) => {

  try {
    const object = {
      weight: _reg.query.weight,
      height: _reg.query.height,
      bmi: calculateBMI(Number(_reg.query.height), Number(_reg.query.weight))
    }
    
    res.json(object)

  } catch {
    res.status(400).send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});