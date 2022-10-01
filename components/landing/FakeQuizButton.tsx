import React from "react";
import QuizButton from "../QuizButton";
import styled from "styled-components";

const FakeQuizButton = styled(QuizButton)`
	cursor: default;
	width: 20vw;

	&:hover {
		filter: brightness(1);
	}
`;

export default FakeQuizButton;