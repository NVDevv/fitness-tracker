import "./App.css";
import MainScreen from "./screens/MainScreen.tsx";
import WorkoutPage from "./screens/WorkoutPage.tsx";
import { useState } from "react";

type Page = "MainScreen" | "WorkoutPage";

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
						onStart={() => {
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
