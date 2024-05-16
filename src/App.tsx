import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

function App() {
	const [reRoll, setReRoll] = React.useState(0);
	const [playerArr, setPlayerArr] = React.useState<number[] | []>([]);

	const playerBoxesStyle = {
		padding: 1,
		fontWeight: 600,
		width: 100,
	};

	function randomInteger(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function generatePlayers() {
		let tempPlayerArr = [2];
		for (let i = 0; i < 9; i++) {
			tempPlayerArr.push(randomInteger(0, 4));
		}
		return tempPlayerArr;
	}

	function playerDivBasedOnScore(score: number) {
		switch (score) {
			case 0:
				return (
					<Paper
						elevation={2}
						sx={{ backgroundColor: "darkred", ...playerBoxesStyle }}
					>
						Feeder
					</Paper>
				);
			case 1:
				return (
					<Paper
						elevation={2}
						sx={{ backgroundColor: "red", ...playerBoxesStyle }}
					>
						Bad
					</Paper>
				);
			case 2:
				return (
					<Paper
						elevation={2}
						sx={{ backgroundColor: "yellow", ...playerBoxesStyle }}
					>
						Ok
					</Paper>
				);
			case 3:
				return (
					<Paper
						elevation={2}
						sx={{ backgroundColor: "green", ...playerBoxesStyle }}
					>
						Good
					</Paper>
				);
			case 4:
				return (
					<Paper
						elevation={2}
						sx={{ backgroundColor: "orange", ...playerBoxesStyle }}
					>
						Smurf
					</Paper>
				);
		}
	}

	function calcOutcome() {
		const yourTeam = playerArr
			.slice(0, 5)
			.reduce((acc, value) => acc + value, 0);
		const enemyTeam = playerArr
			.slice(5)
			.reduce((acc, value) => acc + value, 0);
		const whichTeamIsStronger = yourTeam - enemyTeam;
		return whichTeamIsStronger <= 0 ? "LOSS" : "WIN";
	}

	function handleReRollSinglePlayer(idx: number){
		let newPlayer = randomInteger(0, 4);
		let newArr = [...playerArr];
		newArr[idx] = newPlayer;
		setPlayerArr(newArr)
	}

	React.useEffect(() => {
		setPlayerArr(generatePlayers());
	}, [reRoll]);

	return (
		<Box sx={{ padding: 2 }}>
			<Button variant="contained" onClick={() => setReRoll(reRoll + 1)}>
				{reRoll === 0 ? "QUE UP" : "NEW LOBBY"}
			</Button>
			{/* Outcome prediction */}
			{/* <Typography variant="body1" sx={{ marginTop: 3 }}>
				Outcome prediction:{" "}
				{reRoll === 0 ? "please que up" : calcOutcome()}
			</Typography> */}
			<hr />
			{Boolean(reRoll) && (
				<Box>
					{/*  PLAYERS BOX */}
					<Typography variant="h5">Your team</Typography>
					{/* Your Team */}
					<Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
						{playerArr
							.slice(0, 5)
							.map((item: number, idx: number) => {
								if (idx === 0) {
									return (
										<Paper
											sx={{
												backgroundColor: "lightgray",
												...playerBoxesStyle,
											}}
											key={"you_key"}
										>
											You
										</Paper>
									);
								}
								return (
									<Box key={idx}>
										{playerDivBasedOnScore(item)}
										<Button onClick={()=> handleReRollSinglePlayer(idx)}>new player</Button>
									</Box>
								);
							})}
					</Box>
					{/* ENEMY TEAM */}
					{/* <Typography variant="h5" sx={{ marginTop: 3 }}>
						Enemy team
					</Typography>
					<Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
						{playerArr.slice(5).map((item: number, idx: number) => {
							return (
								<Box key={idx}>
									{playerDivBasedOnScore(item)}
								</Box>
							);
						})}
					</Box> */}
					{/* end of players box */}
				</Box>
			)}
		</Box>
	);
}

export default App;
