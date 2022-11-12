import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { EndGameData, GamePageProps } from '../../pages/lobby/[code]';
import { color } from '../../styles/theme';
import { limitStringTo } from '../../utils/helper';
import Button from '../Button';

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
`;

const UsersPlace = styled.h1`
    font-size: 24px;
    font-weight: 100;
    color: ${color('white0')};
    letter-spacing: -0.4px;
    text-align: center;
    margin: 20px 0;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
`;

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${color('black0')};
    border-radius: 3px 3px 0 0;
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
`;

const Username = styled.h2`
    overflow-wrap: anywhere;
    text-align: center;
    margin-bottom: 10px;
`;

const Score = styled.p`
    font-weight: 300;
    font-size: 16px;
    color: ${color('white2')};
`;

const Answers = styled.p`
    font-weight: 200;
    font-size: 16px;
    color: ${color('white1')};
`;

const LeaveButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

type Props = GamePageProps & EndGameData;

const GameEnd: FunctionComponent<Props> = ({ results, questions, gameData }) => {
    const router = useRouter();
    const sortedResults = results.sort((a, b) => b.score - a.score).map(result => ({ ...result, username: limitStringTo(result.username, 30) }));
    const currentUserResult = sortedResults.map((result, idx) => ({ ...result, idx })).filter(result => result.username === gameData.username)[0];

    return (
        <Container>
            <LeaveButton onClick={() => router.push('/')}>Leave</LeaveButton>
            <UsersPlace>
                You are #{currentUserResult.idx + 1} with {currentUserResult.score} points!
            </UsersPlace>
            <Row>
                {sortedResults.length >= 2 && (
                    <Block style={{ width: '17.5vw', height: '40vh', zIndex: 2 }}>
                        <Username style={{ fontSize: '20px', fontWeight: 200 }}>{sortedResults[1].username}</Username>
                        <Score>{sortedResults[1].score}</Score>
                        <Answers>
                            {sortedResults[1].answers} out of {questions}
                        </Answers>
                    </Block>
                )}
                <Block style={{ width: '15vw', height: '50vh', zIndex: 3 }}>
                    <Username style={{ fontSize: '22px', fontWeight: 100 }}>{sortedResults[0].username}</Username>
                    <Score>{sortedResults[0].score}</Score>
                    <Answers>
                        {sortedResults[0].answers} out of {questions}
                    </Answers>
                </Block>
                {sortedResults.length >= 3 && (
                    <Block style={{ width: '20vw', height: '33vh', zIndex: 1 }}>
                        <Username style={{ fontSize: '18px', fontWeight: 300 }}>{sortedResults[2].username}</Username>
                        <Score>{sortedResults[2].score}</Score>
                        <Answers>
                            {sortedResults[2].answers} out of {questions}
                        </Answers>
                    </Block>
                )}
            </Row>
        </Container>
    );
};

export default GameEnd;
