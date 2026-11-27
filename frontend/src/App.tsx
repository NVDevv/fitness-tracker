import "./App.css";
import MainScreen from "./screens/MainScreen.tsx";
import WorkoutPage from "./screens/WorkoutPage.tsx";
import { useState } from "react";

type Page = "MainScreen" | "WorkoutPage";

type Workout = {
	id: number;
	date: string;
	finished: boolean;
};


function App() {
	const [page, setPage] = useState<Page>("MainScreen");

	const [workoutId, setWorkoutId] = useState<number | null>(null);
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
				{page === "MainScreen" || !workoutId ? (
					<MainScreen
						onStart={async () => {
							const response = await fetch("/api/workouts", {
								method: "POST",
							});
							const workout: Workout = await response.json();
							setWorkoutId(workout.id);

							setPage("WorkoutPage");
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
