import "./App.css";
import MainScreen from "./screens/MainScreen.tsx";
import WorkoutPage from "./screens/WorkoutPage.tsx";
import { useState } from "react";

type Page = "MainScreen" | "WorkoutPage";

function App() {
	const [pageDecider, setPage] = useState<Page>("MainScreen");

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
				{pageDecider === "MainScreen" ? <MainScreen /> : <WorkoutPage />}
				<button onClick={() => setPage("WorkoutPage")}>Switch pages</button>
			</div>
		</>
	);
}

export default App;
