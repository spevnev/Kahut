import styled from 'styled-components';
import { color } from '../styles/theme';

const Radio = styled.input.attrs(_ => ({ type: 'radio' }))`
    & {
        position: relative;
        width: 12px;
        height: 12px;
        margin: 5px 2px;
    }

    &:before {
        content: '';
        position: absolute;
        left: -1px;
        top: -1px;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background: ${color('white2')};
        cursor: ${props => (props.disabled ? 'default' : 'pointer')};
    }

    &:after {
        content: '';
        width: 11px;
        height: 11px;
        background: ${color('frost0')};
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 100%;
        transition: all 0.2s ease;
        cursor: ${props => (props.disabled ? 'default' : 'pointer')};
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
