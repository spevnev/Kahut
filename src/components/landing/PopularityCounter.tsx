import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import useOnVisible from '../../hooks/useOnVisible';

const Container = styled.div<{ ref: any }>`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p<{ big?: boolean }>`
    font-size: ${props => (props.big ? 28 : 16)}px;
    font-weight: 200;
`;

const CHANGE_PER_INTERVAL = 1758; // magic number
const UPDATE_INTERVAL = 1000 / 30; // ~30 updates per second
const INITIAL_COUNTER = 100 * 1000;

const PopularityCounter: FunctionComponent = () => {
    const [counter, setCounter] = useState(INITIAL_COUNTER);

    const decrease = () => {
        const newCounter = counter - CHANGE_PER_INTERVAL;

        setCounter(Math.max(newCounter, 0));
        if (newCounter > 0) setTimeout(decrease, UPDATE_INTERVAL);
    };

    const [containerRef] = useOnVisible({ screenPositionCoefficient: 3 / 4, callback: decrease });

    return (
        <Container ref={containerRef}>
            <Text>More than</Text>
            <Text big>{counter}</Text>
            <Text>users each year</Text>
        </Container>
    );
};

export default PopularityCounter;
