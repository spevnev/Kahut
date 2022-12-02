import styled from 'styled-components';
import { color } from '../styles/theme';

const Button = styled.div<{ disable?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${color('frost1')};
    transition: background-color 0.2s;
    border-radius: 3px;
    padding: 4px 8px;
    color: ${color('white0')};
    font-size: 16px;
    font-weight: 200;
    cursor: ${props => (props.disable ? 'default' : 'pointer')};
    filter: brightness(${props => (props.disable ? 0.9 : 1)});

    &:hover {
        background: ${props => color(props.disable ? 'frost1' : 'frost0')()};
    }
`;

export default Button;
