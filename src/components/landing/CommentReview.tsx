import React from "react";
import {StaticImageData} from "next/image";
import styled from "styled-components";
import {color} from "../../utils/globalStyles";

const Container = styled.div`
	position: relative;
	width: 46.5vw;
	background: ${color("white1")};
	border-radius: 5px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	&::before {
		content: '';
		position: absolute;
		z-index: -1;
		bottom: 0;
		left: 10%;
		width: 15px;
		height: 15px;
		background: ${color("white1")};
		transform: translateX(-50%) translateY(50%) rotate(45deg);
		border-radius: 3px;
	}
`;

const Quote = styled.h3`
	font-size: 20px;
	font-weight: 200;
	color: ${color("black1")};
	margin-bottom: 5px;
`;

const Name = styled.p`
	font-size: 14px;
	font-weight: 300;
	color: ${color("black2")};
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	margin: 8px;
`;

const Image = styled.img`
	margin: 8px;
	margin-right: 0;
	border-radius: 50%;
	width: 64px;
	height: 64px;
`;

type Props = {
	user: {
		name: string,
		image: StaticImageData
	},
	children: string
}

const CommentReview = ({user: {name, image: {src: image}}, children}: Props) => (
	<Container>
		<Image src={image} alt="Profile picture"/>
		<Column>
			{/* eslint-disable-next-line react/no-unescaped-entities */}
			<Quote>"{children}"</Quote>
			<Name>{name}</Name>
		</Column>
	</Container>
);

export default CommentReview;