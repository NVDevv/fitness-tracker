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

type WorkoutIdPropType = {
	workoutId: number;
};

function WorkoutPage(props: WorkoutIdPropType) {
	const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);

	const [chosenExerciseId, setChosenExerciseId] = useState<number>(0);

	const [workoutSets, setWorkoutSets] = useState<WorkoutSet[]>([]);

	const [repsText, setRepsText] = useState<string>("");

	const [weightText, setWeightText] = useState<string>("");

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const [currentDate, setCurrentDate] = useState<string>("");

	const [reloadCount, setReloadCount] = useState<number>(0);

	useEffect(() => {
		async function loadExercises() {
			const response = await fetch("/api/exercises");
			const data: Exercise[] = await response.json();
			setCurrentExercises(data);
			setChosenExerciseId(data[0].id);
		}
		loadExercises();
	}, []);

	useEffect(() => {
		async function loadWorkout() {
			const response = await fetch(`/api/workouts/${props.workoutId}`);
			const data: Workout = await response.json();
			setCurrentDate(data.date);
			setWorkoutSets(data.sets);
		}
		loadWorkout();
	}, [props.workoutId, reloadCount]);

	return (
		<>
			<h1>{currentDate}</h1>
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
						onClick={async () => {
							await fetch("/api/sets", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									workoutId: props.workoutId,
									exerciseId: chosenExerciseId,
									reps: Number(repsText),
									weight: Number(weightText),
								}),
							});
							setReloadCount(reloadCount + 1);

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
