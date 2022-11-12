import { gql } from 'apollo-server-core';
import { FunctionComponent, useState } from 'react';
import { GamePageProps, ShowQuestionData } from '../../pages/lobby/[code]';
import { useMutation } from '@apollo/client';
import Radio from '../Radio';
import Button from '../Button';
import Checkbox from '../Checkbox';
import QuizButton from '../QuizButton';
import TimerLine from '../TimerLine';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import Timer from '../Timer';
import ScalingText from '../ScalingText';

const SUBMIT_ANSWER = gql`
    mutation submitAnswer($game_token: String!, $question_id: String!, $answers: [Int!]!) {
        submitAnswer(game_token: $game_token, question_id: $question_id, answers: $answers)
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 2.5vw;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const QuestionNumber = styled.p`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 18px;
    font-weight: 300;
    color: ${color('white1')};
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 100;
    letter-spacing: -0.3px;
    margin: 8px 0;
    padding: 10px 0;
    width: 100%;
    text-align: center;
    background: ${color('black0')};
    color: ${color('white1')};
`;

const SecondaryTitle = styled.h1`
    font-size: 28px;
    font-weight: 200;
    letter-spacing: -0.1px;
    margin-top: 8px;
    padding: 5px 10px;
    background: ${color('black0')};
    color: ${color('white1')};
    border-radius: 5px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.3);
`;

const Image = styled.img`
    max-width: 70vw;
    max-height: 40vh;
    margin-left: -50px;
`;

const StyledQuizButton = styled(QuizButton)`
    margin: 8px 12px;
    max-height: 12.5vh;

    & input {
        margin: 0 5px 0 10px;
    }
`;

type Props = GamePageProps & ShowQuestionData;

const QuestionPage: FunctionComponent<Props> = ({ id, title, image, type, index, choices, time, gameToken }) => {
    const [answers, setAnswers] = useState<number[]>([]);
    const [canAnswer, setCanAnswer] = useState(true);
    const [_submitAnswer] = useMutation(SUBMIT_ANSWER);
    const [showPrompt, setShowPrompt] = useState(true);

    const submitAnswer = async () => {
        if (answers.length === 0) return;

        const { data } = await _submitAnswer({ variables: { game_token: gameToken, question_id: id, answers: answers } });
        if (data.submitAnswer) setCanAnswer(false);
    };

    if (showPrompt)
        return (
            <Container style={{ justifyContent: 'center' }}>
                <Title>{title}</Title>
                <TimerLine time={3} height={15} onEnd={() => setShowPrompt(false)} />
            </Container>
        );
    else
        return (
            <Container>
                <SecondaryTitle>{title}</SecondaryTitle>
                <QuestionNumber>#{index + 1}</QuestionNumber>

                <Row>
                    <Timer time={time} />
                    <Image src={image} />
                    <div />
                </Row>

                <Buttons>
                    {choices.map((text, idx) => {
                        const checkboxOnChange = () => canAnswer && setAnswers(answers.includes(idx) ? answers.filter(val => val !== idx) : [...answers, idx]);
                        const radioOnChange = () => canAnswer && setAnswers([idx]);

                        return (
                            <StyledQuizButton key={idx} color={idx} disabled={!canAnswer} onClick={type === 'single' ? radioOnChange : checkboxOnChange}>
                                {type === 'single' ? (
                                    <Radio name="radio" checked={answers[0] === idx} onChange={radioOnChange} disabled={!canAnswer} />
                                ) : (
                                    <Checkbox checked={answers.filter(val => val === idx).length > 0} onChange={checkboxOnChange} disabled={!canAnswer} />
                                )}
                            </StyledQuizButton>
                                <ScalingText max={22} charsPerPx={23}>
                                    {text}
                                </ScalingText>
                        );
                    })}
                </Buttons>

                <Button style={{ marginBottom: '10px' }} onClick={submitAnswer}>
                    Submit answer
                </Button>
            </Container>
        );
};

export default QuestionPage;
