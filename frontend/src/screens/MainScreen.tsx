function MainScreen() {
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
				<h1>Workout Tracker</h1>
				<button style={{ width: "160px", height: "48px" }}>Start</button>
			</div>
		</>
	);
}

export default MainScreen;
