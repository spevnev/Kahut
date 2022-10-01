import {createGlobalStyle} from "styled-components";

export const theme: { [key: string]: string } = {
	black0: "#2E3440",
	black1: "#3B4252",
	black2: "#434C5E",
	black3: "#4C566A",

	white0: "#ECEFF4",
	white1: "#E5E9F0",
	white2: "#D8DEE9",

	frost0: "#2589FF",
	frost1: "#3487ED",
	frost2: "#2865B0",
	frost3: "#5E81AC",
	frost4: "#81A1C1",

	red: "#BF616A",
	orange: "#D08770",
	yellow: "#EBCB8B",
	green: "#A3BE8C",
	purple: "#B48EAD",
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
		font-family: 'Roboto', sans-serif;
		font-weight: 300;
	}

	body {
		background: ${color("black0")};
		color: ${color("white0")};
	}
`;

export default GlobalStyles;