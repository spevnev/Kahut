import { createGlobalStyle } from 'styled-components';
import { color } from './theme';

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
		color: ${color('white0')};
	}
`;

export default GlobalStyles;
