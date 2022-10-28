import styled from 'styled-components';
import { color } from '../styles/theme';

const Button = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${color('frost1')};
    transition: background-color 0.2s;
    cursor: pointer;
    border-radius: 3px;
    padding: 4px 8px;
    color: ${color('white0')};
    font-size: 16px;
    font-weight: 200;

    &:hover {
        background: ${color('frost0')};
    }
`;

export default Button;
