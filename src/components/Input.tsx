import styled from 'styled-components';
import { color } from '../styles/theme';

const Input = styled.input`
    outline: none;
    border: none;
    border-radius: 5px;
    background: ${color('black0')};
    padding: 4px 10px;
    color: ${color('white0')};
    font-size: 16px;
    font-weight: 200;
    box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.3);

    &::placeholder {
        color: ${color('gray')};
    }
`;

export default Input;
