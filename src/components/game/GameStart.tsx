import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StartGameData } from '../../pages/lobby/[code]';
import { color } from '../../styles/theme';
import TimerLine from '../TimerLine';
import ScalingText from '../ScalingText';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Title = styled(ScalingText)`
    font-weight: 100;
    letter-spacing: -0.3px;
    margin: 8px 0;
    padding: 10px 20px;
    width: 100%;
    text-align: center;
    background: ${color('black0')};
    color: ${color('white1')};

    @media (max-width: 800px) {
        padding: 8px 15px;
    }
`;

const Image = styled.img`
    max-width: 50vw;
    max-height: 30vh;
`;

const GameStart: FunctionComponent<StartGameData> = ({ title, image }) => (
    <Container>
        {image && <Image src={image} />}
        <Title max={36} charsPerPx={7} min={14}>
            {title}
        </Title>
        <TimerLine time={5} height={15} />
    </Container>
);

export default GameStart;
