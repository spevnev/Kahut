import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { color } from '../styles/theme';

const Container = styled.div`
    background: ${color('purple')};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

type Props = { time: number };

const Timer: FunctionComponent<Props> = ({ time: _time }) => {
    const [time, setTime] = useState(_time);

    useEffect(() => {
        if (time) setTimeout(() => setTime(time - 1), 1000);
    }, [time]);

    return <Container>{time}</Container>;
};

export default Timer;
