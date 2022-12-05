import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { EndGameData, GamePageProps } from '../../pages/lobby/[code]';
import { color } from '../../styles/theme';
import { limitStringTo } from '../../utils/helper';
import Button from '../Button';
import { deleteCookie } from '../../utils/cookies';

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
    margin-top: 20px;

    @media (max-width: 450px) {
        margin-top: 50px;
    }
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

    @media (max-width: 450px) {
        padding: 2px;
    }
`;

const Username = styled.h2<{ fontSize: number }>`
    overflow-wrap: anywhere;
    text-align: center;
    margin-bottom: 10px;
    font-size: ${props => props.fontSize}px;

    @media (max-width: 600px) {
        font-size: ${props => props.fontSize / 1.5}px;
    }
`;

const Score = styled.p`
    font-weight: 300;
    font-size: 16px;
    color: ${color('white2')};

    @media (max-width: 600px) {
        font-size: 13px;
    }
`;

const Answers = styled.p`
    font-weight: 200;
    font-size: 16px;
    color: ${color('white1')};

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

const LeaveButton = styled(Button)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

type PlaceProps = {
    minWidth: string;
    width: string;
    height: string;
    zIndex: number;
    fontWeight: number;
    fontSize: number;
    result?: {
        username: string;
        score: number;
        answers: number;
    };
    questions: number;
};

const Place: FunctionComponent<PlaceProps> = ({ minWidth, width, height, zIndex, result, fontWeight, fontSize, questions }) => (
    <Block style={{ minWidth, width, height, zIndex, opacity: result ? 1 : 0 }}>
        <Username fontSize={fontSize} style={{ fontWeight }}>
            {limitStringTo(result?.username || '', 30)}
        </Username>
        <Score>{result?.score}</Score>
        <Answers>
            {result?.answers} out of {questions}
        </Answers>
    </Block>
);

type Props = GamePageProps & EndGameData;

const GameEnd: FunctionComponent<Props> = ({ results, questions, gameData }) => {
    const router = useRouter();
    const sortedResults = results.sort((a, b) => b.score - a.score);
    const currentUserResult = sortedResults.map((result, index) => ({ ...result, index })).find(result => result.username === gameData.username);

    useEffect(() => void deleteCookie('game_token'), []);

    return (
        <Container>
            <LeaveButton onClick={() => router.push('/')}>Leave</LeaveButton>
            {currentUserResult && (
                <UsersPlace>
                    You are #{currentUserResult.index + 1} with {currentUserResult.score} points!
                </UsersPlace>
            )}
            <Row>
                <Place result={sortedResults[1]} minWidth="87.5px" width="17.5vw" height="40vh" zIndex={2} fontSize={20} fontWeight={200} questions={questions} />
                <Place result={sortedResults[0]} minWidth="75px" width="15vw" height="50vh" zIndex={3} fontSize={22} fontWeight={100} questions={questions} />
                <Place result={sortedResults[2]} minWidth="100px" width="20vw" height="33vh" zIndex={1} fontSize={18} fontWeight={300} questions={questions} />
            </Row>
        </Container>
    );
};

export default GameEnd;
