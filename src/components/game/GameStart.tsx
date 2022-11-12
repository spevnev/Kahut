import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StartGameData } from '../../pages/lobby/[code]';
import { color } from '../../styles/theme';
import TimerLine from '../TimerLine';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 100;
    letter-spacing: -0.3px;
    margin: 8px 0;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    background: ${color('black0')};
    color: ${color('white1')};
`;

const Image = styled.img`
    max-width: 50vw;
    max-height: 30vh;
`;

const GameStart: FunctionComponent<StartGameData> = ({ title, image }) => (
    <Container>
        <Image src={image} />
        <Title>{title}</Title>
        <TimerLine time={5} height={15} />
    </Container>
);

export default GameStart;
