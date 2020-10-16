interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesInterface {
  target: number;
  trainingHours: Array<number>;
}

const parseArgumentsExercises = (args: Array<string>): ExercisesInterface => {
  if (args.length < 4) throw new Error("Not enough arguments");
  // The first 2 arguments are "node filename" so I skip them
  const exercisesArgv = args.slice(2);
  // I check every element of the array to be type number
  if (exercisesArgv.every((arg) => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      // The third argument is the target so I create the array with the rest of them
      trainingHours: args.slice(3).map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): ExerciseResult => {
  console.log(dailyHours, target);
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day > 0).length;
  const average =
    dailyHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target ? true : false;
  let rating;
  let ratingDescription;
  if (average > target) {
    rating = 3;
    ratingDescription = "Good job";
  } else if (target - average <= 0.5) {
    rating = 2;
    ratingDescription = "You could do better";
  } else if (target - average <= 1) {
    rating = 1;
    ratingDescription = "You need to train more";
  } else {
    rating = 0;
    ratingDescription = "Very bad";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, trainingHours } = parseArgumentsExercises(process.argv);
  console.log(calculateExercises(trainingHours, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("there was an error:", e.message);
}
