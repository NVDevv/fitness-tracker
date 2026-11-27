import "./App.css";
import MainScreen from "./screens/MainScreen.tsx";
import WorkoutPage from "./screens/WorkoutPage.tsx";
import { useState } from "react";

type Workout = {
	id: number;
	date: string;
	finished: boolean;
};

function App() {
	const [workoutId, setWorkoutId] = useState<number>(
		Number(localStorage.getItem("workoutId")),
	);


	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: "12px",
				}}
			>
				{!workoutId ? (
					<MainScreen
						onStart={async () => {
							const response = await fetch("/api/workouts", {
								method: "POST",
							});
							const workout: Workout = await response.json();
							setWorkoutId(workout.id);

							localStorage.setItem("workoutId", String(workout.id));
						}}
					/>
				) : (
					<WorkoutPage workoutId={workoutId} />
				)}
			</div>
		</>
	);
}

export default App;
