import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Text = styled.p``;

type Props = { time: number };

const Timer: FunctionComponent<Props> = ({ time: _time }) => {
    const [time, setTime] = useState(_time);

    useEffect(() => {
        if (time) setTimeout(() => setTime(time - 1), 1000);
    }, [time]);

    return (
        <Container>
            <Text>{time}</Text>
        </Container>
    );
};

export default Timer;
