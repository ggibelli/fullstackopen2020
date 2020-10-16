import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height) res.status(400).json({ error: "parameters missing" });
  if (isNaN(weight) || isNaN(height))
    res.status(400).json({ error: "parameters must be numbers" });
  const bmi = calculateBmi(height, weight);
  res.status(200).json({ weight: weight, height: height, bmi: bmi });
});

app.post("/exercises", (req, res) => {
  console.log(req);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  }
  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((day) => isNaN(day))
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(daily_exercises, Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
