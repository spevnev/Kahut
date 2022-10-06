import React from "react";
import styled from "styled-components";
import {color} from "../utils/globalStyles";
import {useRouter} from "next/router";

const Container = styled.div`
	width: 100vw;
	height: 5vh;
	background: ${color("black0")};
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const FixedContainer = styled(Container)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Title = styled.h2`
	font-size: 24px;
	font-weight: 500;
	font-style: italic;
	margin: 0 25px;
	cursor: pointer;
`;

const UnstyledLink = styled.a`
	font-size: 18px;
	text-decoration: none;
	color: ${color("white0")};
	cursor: pointer;
`;

const HeaderLink = styled(UnstyledLink)`
	margin: 0 10px;
	font-weight: 200;
`;

const TextLink = styled(UnstyledLink)`
	font-weight: 100;
`;

const ButtonLink = styled(UnstyledLink)`
	font-size: 16px;
	padding: 3px 20px;
	border-radius: 5px;
	background: ${color("frost0")};
	margin: 0 15px;
	transition: filter .2s;

	&:hover {
		filter: brightness(1.1);
	}
`;


const Header = () => {
	const router = useRouter();

	const isAuthenticated = () => true;

	return (
		<>
			<Container/> {/* Fake container to have implicit margin of the same height */}
			<FixedContainer>
				<Row>
					<Title onClick={() => router.push("/")}>Kahut!</Title>
					<Row>
						<HeaderLink onClick={() => router.push("/games")}>Browse games</HeaderLink>
						{isAuthenticated() && <HeaderLink onClick={() => router.push("/my_games")}>My games</HeaderLink>}
						<HeaderLink onClick={() => router.push("/play")}>Play</HeaderLink>
					</Row>
				</Row>
				<Row>
					<TextLink onClick={() => router.push("/login?signin")}>Sign in</TextLink>
					<ButtonLink onClick={() => router.push("/login?signup")}>Sign up</ButtonLink>
				</Row>
			</FixedContainer>
		</>
	);
};

export default Header;