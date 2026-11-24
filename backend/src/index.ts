import express from "express";

const app = express();

app.use(express.json());

type Workout = {
	id: number;
	date: string;
	finished: boolean;
};

type WorkoutSet = {
	id: number;
	workoutId: number;
	exerciseId: number;
	reps: number;
	weight: number;
};
let newSetsId = 1;
const workoutSets: WorkoutSet[] = [];

const exercises = [
	{
		id: 1,
		name: "Bench Press",
	},
	{
		id: 2,
		name: "Incline Press",
	},
	{
		id: 3,
		name: "Flyes",
	},
	{
		id: 4,
		name: "Wide Chest Machine",
	},
];

const workouts: Workout[] = [];
let newWorkoutId = 1;

app.get("/exercises", (req, res) => {
	res.json(exercises);
});

app.post("/workouts", (req, res) => {
	const todaysDate: string = new Date().toISOString().split("T")[0];
	const newWorkout: Workout = {
		id: newWorkoutId,
		date: todaysDate,
		finished: false,
	};
	newWorkoutId++;
	workouts.push(newWorkout);
	res.status(201).json(newWorkout);
});

app.get("/workouts/:id", (req, res) => {
	const idFromUrl = req.params.id;
	const idConverted = Number(idFromUrl);

	const workoutById: Workout | undefined = workouts.find(
		(workout) => workout.id === idConverted,
	);

	if (!workoutById) {
		return res.status(404).json({ error: "Workout not found" });
	}

	const correctSets = workoutSets.filter(
		(correctSet) => correctSet.workoutId === workoutById.id,
	);

	// map: turn each set of this workout into a new object for the response
	const usersSets = correctSets.map((workingSet) => {
		const exercise = exercises.find(
			(exercise) => exercise.id === workingSet.exerciseId,
		);

		return {
			id: workingSet.id,
			exerciseId: workingSet.exerciseId,
			exerciseName: exercise?.name,
			reps: workingSet.reps,
			weight: workingSet.weight,
		};
	});

	const workoutWithSets = { ...workoutById, sets: usersSets };

	return res.json(workoutWithSets);
});

app.post("/sets", (req, res) => {
	const { workoutId, exerciseId, reps, weight } = req.body;

	const workoutById: Workout | undefined = workouts.find(
		(workout) => workout.id === workoutId,
	);

	if (!workoutById) {
		return res.status(404).json({ error: "Workout not found" });
	}

	const exerciseById = exercises.find((exercise) => exercise.id === exerciseId);

	if (!exerciseById) {
		return res.status(404).json({ error: "Exercise not found" });
	}

	const newSet: WorkoutSet = {
		id: newSetsId,
		workoutId: workoutById.id,
		exerciseId: exerciseById.id,
		reps: reps,
		weight: weight,
	};

	newSetsId++;
	workoutSets.push(newSet);
	res.status(201).json(newSet);
});

app.listen(3000, () => {
	console.log("Server is running");
});
