import styled from 'styled-components';
import { color } from '../styles/theme';

const Checkbox = styled.input.attrs(_ => ({ type: 'checkbox' }))`
    & {
        position: relative;
        width: 12px;
        height: 12px;
        margin: 2px 5px 2px 0;
    }

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 15px;
        height: 15px;
        border-radius: 2px;
        background: ${color('white2')};
        cursor: pointer;
    }

    &:after {
        content: '';
        width: 11px;
        height: 11px;
        background: ${color('frost0')};
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 2px;
        transition: all 0.2s ease;
    }

    &:not(:checked):after {
        opacity: 0;
        transform: scale(0);
    }

    &:checked:after {
        opacity: 1;
        transform: scale(1);
    }
`;

export default Checkbox;
