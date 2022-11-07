import styled, { keyframes } from 'styled-components';
import { color } from '../styles/theme';
import { FunctionComponent, useEffect } from 'react';

const SlidingAnimation = keyframes`
    0% {
        width: 0;
    }

    100% {
        width: 100%;
    }
`;

const TimerLineContainer = styled.div<{ time: number; height: number }>`
    height: ${props => props.height}px;
    width: 100%;
    background: ${color('frost0')};
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: ${props => props.height}px;
        background: ${color('frost3')};
        animation: ${SlidingAnimation} ${props => props.time}s linear forwards;
    }
`;

type Props = {
    time: number;
    height?: number;
    onEnd?: () => void;
};

const TimerLine: FunctionComponent<Props> = ({ time, height, onEnd }) => {
    useEffect(() => {
        if (onEnd) setTimeout(() => onEnd(), time * 1000);
    }, []);

    return <TimerLineContainer time={time} height={height || 10} />;
};

export default TimerLine;
