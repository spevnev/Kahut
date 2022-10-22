import styled from 'styled-components';
import { color } from '../styles/theme';

const Radio = styled.input.attrs(props => ({ type: 'radio' }))`
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
        width: 12px;
        height: 12px;
        border: 1px solid ${color('white2')};
        border-radius: 100%;
        background: ${color('white0')};
        cursor: pointer;
    }

    &:after {
        content: '';
        width: 10px;
        height: 10px;
        background: ${color('frost0')};
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 100%;
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

export default Radio;
