import styled from 'styled-components';
import { color } from '../styles/theme';

const InlineInput = styled.input`
    border: none;
    outline: none;
    background: none;
    color: ${color('white0')};
    font-size: 18px;
    font-weight: 200;
    padding: 0 5px 2px 5px;
    border-bottom: 1px solid ${color('white2')};
    width: 100%;
`;

export default InlineInput;
