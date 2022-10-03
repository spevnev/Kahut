import React, {useState} from "react";
import styled from "styled-components";
import useOnVisible from "../../hooks/useOnVisible";

const Container = styled.div<{ ref: any }>`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Text = styled.p<{ big?: any }>`
	font-size: ${props => props.big ? 28 : 16}px;
	font-weight: 200;
`;

const SPEED = 1758;
let _counter = 100000;
const PopularityCounter = () => {
	const [counter, setCounter] = useState(_counter);

	const decrease = () => {
		_counter -= SPEED;
		setCounter(Math.max(_counter, 0));
		if (_counter > 0) setTimeout(decrease, 17);
	};

	const ref = useOnVisible({
		positionCoefficient: 3 / 4, callback: decrease,
	});

	return (
		<Container ref={ref}>
			<Text>More than</Text>
			<Text big>{counter}</Text>
			<Text>users each year</Text>
		</Container>
	);
};

export default PopularityCounter;