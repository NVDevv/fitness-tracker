import { useEffect, useState } from "react";

type Workout = {
	id: number;
	date: string;
	finished: boolean;
	sets: WorkoutSet[];
};

type WorkoutSet = {
	id: number;
	exerciseId: number;
	exerciseName: string;
	reps: number;
	weight: number;
};

type Exercise = {
	id: number;
	name: string;
};

const fakeWorkout: Workout = {
	id: 1,
	date: "2026-11-16",
	finished: false,
	sets: [
		{
			id: 1,
			exerciseId: 1,
			exerciseName: "Bench Press",
			reps: 10,
			weight: 100,
		},
		{
			id: 2,
			exerciseId: 2,
			exerciseName: "Incline Press",
			reps: 10,
			weight: 40,
		},
		{
			id: 3,
			exerciseId: 3,
			exerciseName: "Flyes",
			reps: 10,
			weight: 25,
		},
		{
			id: 4,
			exerciseId: 1,
			exerciseName: "Bench Press",
			reps: 10,
			weight: 115,
		},
		{
			id: 5,
			exerciseId: 2,
			exerciseName: "Incline Press",
			reps: 10,
			weight: 35,
		},
		{
			id: 6,
			exerciseId: 3,
			exerciseName: "Flyes",
			reps: 10,
			weight: 25,
		},
		{
			id: 7,
			exerciseId: 4,
			exerciseName: "Wide Chest Machine",
			reps: 10,
			weight: 90,
		},
	],
};

function WorkoutPage() {
	const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);

	const [chosenExerciseId, setChosenExerciseId] = useState<number>(0);

	const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>(
		fakeWorkout.sets,
	);

	const [repsText, setRepsText] = useState<string>("");

	const [weightText, setWeightText] = useState<string>("");

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	useEffect(() => {
		async function loadExercises() {
			const response = await fetch("/api/exercises");
			const data: Exercise[] = await response.json();
			setCurrentExercises(data);
			setChosenExerciseId(data[0].id);
		}
		loadExercises();
	}, []);

	return (
		<>
			<h1>{fakeWorkout.date}</h1>
			<ul>
				{workoutSets.map((workoutSet) => (
					<li key={workoutSet.id}>
						{workoutSet.exerciseName} for {workoutSet.reps} with{" "}
						{workoutSet.weight} kgs.
					</li>
				))}
			</ul>

			<button
				onClick={() => {
					setIsFormOpen(true);
				}}
			>
				Add Exercise
			</button>

			{isFormOpen && (
				<>
					<select
						onChange={(event) =>
							setChosenExerciseId(Number(event.target.value))
						}
						value={chosenExerciseId}
					>
						{currentExercises.map((exercise) => (
							<option key={exercise.id} value={exercise.id}>
								{exercise.name}
							</option>
						))}
					</select>
					<input
						type="number"
						placeholder="Reps"
						value={repsText}
						onChange={(event) => {
							setRepsText(event.target.value);
						}}
					/>
					<input
						type="number"
						placeholder="Weight"
						value={weightText}
						onChange={(event) => {
							setWeightText(event.target.value);
						}}
					/>
					<button
						onClick={() => {
							const exerciseName: string | undefined = currentExercises.find(
								(exercise) => exercise.id === chosenExerciseId,
							)?.name;

							const newSet: WorkoutSet = {
								id: workoutSets.length + 1,
								exerciseId: chosenExerciseId,
								exerciseName: exerciseName || "Exercise not found",
								reps: Number(repsText),
								weight: Number(weightText),
							};

							setWorkoutSets([...workoutSets, newSet]);

							setIsFormOpen(false);
							setRepsText("");
							setWeightText("");
						}}
					>
						Add
					</button>
					<button
						onClick={() => {
							setIsFormOpen(false);
							setRepsText("");
							setWeightText("");
						}}
					>
						Cancel
					</button>
				</>
			)}
		</>
	);
}

export default WorkoutPage;
