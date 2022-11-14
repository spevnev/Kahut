import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShowAnswerData } from '../../pages/lobby/[code]';
import { color } from '../../styles/theme';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import ScalingText from '../ScalingText';
import { Buttons, Container, QuestionNumber, QuestionQuizButton, Title, Image } from './QuestionPage';

const LeaderboardTitle = styled.h1`
    font-size: 32px;
    font-weight: 200;
    margin: 25px 0;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    width: 100vw;

    @media (min-width: 400px) {
        min-width: 250px;
        width: fit-content;
        max-width: 60vw;
        height: 80vh;
        background: ${color('black0')};
        border-radius: 5px;
        box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.35);
        padding: 8px 0px;
    }
`;

const ListElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    &:not(:first-child) {
        border-top: 1px solid ${color('white0')};
    }
`;

const Username = styled.p`
    font-size: 18px;
    font-weight: 100;
    color: ${color('white0')};
    letter-spacing: -0.2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Score = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${color('white1')};
    margin-left: 10px;
`;

const AnswerPage: FunctionComponent<ShowAnswerData> = ({ question: { title, index, image, choices, answers, type }, points }) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    useEffect(() => void setTimeout(() => setShowLeaderboard(true), 5000), []);

    if (showLeaderboard)
        return (
            <Container style={{ justifyContent: 'normal' }}>
                <LeaderboardTitle>Leaderboard</LeaderboardTitle>
                <List>
                    {points
                        .sort((a, b) => b.score - a.score)
                        .map(({ username, score }) => (
                            <ListElement key={username}>
                                <Username>{username}</Username>
                                <Score>{score}</Score>
                            </ListElement>
                        ))}
                </List>
            </Container>
        );
    else
        return (
            <Container>
                <Title max={24} charsPerPx={8} min={16}>
                    {title}
                </Title>
                <QuestionNumber>#{index + 1}</QuestionNumber>
                <Image src={image} />

                <Buttons style={{ marginBottom: '20px' }}>
                    {choices.map((text, idx) => {
                        const isCorrect = answers.filter(val => val === idx).length > 0;

                        return (
                            <QuestionQuizButton key={idx} color={idx} disabled={!isCorrect}>
                                {type === 'single' ? (
                                    <Radio name="radio" defaultChecked={isCorrect} disabled={true} />
                                ) : (
                                    <Checkbox defaultChecked={isCorrect} disabled={true} />
                                )}
                                <ScalingText max={22} charsPerPx={25} min={10}>
                                    {text}
                                </ScalingText>
                            </QuestionQuizButton>
                        );
                    })}
                </Buttons>
            </Container>
        );
};

export default AnswerPage;
