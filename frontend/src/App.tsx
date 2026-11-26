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
				{page === "MainScreen" ? (
					<MainScreen
						onStart={async () => {

							const response = await fetch("/api/workouts", {
								method: "POST",
							});
							const workout: Workout = await response.json();
							console.log({ workout });

							setPage("WorkoutPage");
						}}
					/>
				) : (
					<WorkoutPage />
				)}
			</div>
		</>
	);
}

export default App;
