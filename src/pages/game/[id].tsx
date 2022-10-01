import React from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";

const Game: NextPage = () => {
	const router = useRouter();
	const {id} = router.query;

	return (
		<div>
			<h1>{id}</h1>
		</div>
	);
};

export default Game;