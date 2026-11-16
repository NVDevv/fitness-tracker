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

const fakeWorkout: Workout = {
	id: 1,
	date: "2026-11-16",
	finished: false,
	sets: [
		{
			id: 1,
			exerciseId: 1,
			exerciseName: "benchpress",
			reps: 10,
			weight: 100,
		},
		{
			id: 2,
			exerciseId: 2,
			exerciseName: "inclinepress",
			reps: 10,
			weight: 40,
		},
		{
			id: 3,
			exerciseId: 3,
			exerciseName: "flyes",
			reps: 10,
			weight: 25,
		},
		{
			id: 4,
			exerciseId: 1,
			exerciseName: "benchpress",
			reps: 10,
			weight: 115,
		},
		{
			id: 5,
			exerciseId: 2,
			exerciseName: "inclinepress",
			reps: 10,
			weight: 35,
		},
		{
			id: 6,
			exerciseId: 3,
			exerciseName: "flyes",
			reps: 10,
			weight: 25,
		},
		{
			id: 7,
			exerciseId: 4,
			exerciseName: "widechestmachine",
			reps: 10,
			weight: 90,
		},
	],
};

function WorkoutPage() {
	return (
		<>
			<h1>{fakeWorkout.date}</h1>
			<ul>
				{fakeWorkout.sets.map((workoutSet) => (
					<li key={workoutSet.id}>
						{workoutSet.exerciseName} for {workoutSet.reps} with{" "}
						{workoutSet.weight} kgs.
					</li>
				))}
			</ul>
		</>
	);
}

export default WorkoutPage;
