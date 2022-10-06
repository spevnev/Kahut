import {createGlobalStyle} from "styled-components";

export const theme: { [key: string]: string } = {
	black0: "#2E3440",
	black1: "#3B4252",
	black2: "#434C5E",
	black3: "#4C566A",

	gray: "#8C9097",

	white0: "#ECEFF4",
	white1: "#E5E9F0",
	white2: "#D8DEE9",

	frost0: "#2589FF",
	frost1: "#317ede",
	frost2: "#2865B0",
	frost3: "#5E81AC",
	frost4: "#81A1C1",

	red: "#BC5F68",
	orange: "#CA846D",
	yellow: "#E6C687",
	green: "#9DB787",
	purple: "#B08BA9",
};

export const color = (color: string) => {
	if (!theme[color]) throw new Error("Unknown color!");
	return (): string => theme[color];
};


const GlobalStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Inter Tight', sans-serif;
		font-weight: 300;
	}

	body {
		background: #3e4658;
		color: ${color("white0")};
	}
`;

export default GlobalStyles;