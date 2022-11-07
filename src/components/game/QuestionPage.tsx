import { gql } from 'apollo-server-core';
import { FunctionComponent, useState } from 'react';
import { GamePageProps, ShowQuestionData } from '../../pages/lobby/[code]';
import { useMutation } from '@apollo/client';
import Radio from '../Radio';
import Button from '../Button';
import Checkbox from '../Checkbox';
import QuizButton from '../QuizButton';

const SUBMIT_ANSWER = gql`
    mutation submitAnswer($game_token: String!, $question_id: String!, $answers: [Int!]!) {
        submitAnswer(game_token: $game_token, question_id: $question_id, answers: $answers)
    }
`;

type Props = GamePageProps & ShowQuestionData;

const QuestionPage: FunctionComponent<Props> = ({ id, title, image, type, index, choices, time, gameToken }) => {
    const [answers, setAnswers] = useState<number[]>([]);
    const [canAnswer, setCanAnswer] = useState(true);
    const [_submitAnswer] = useMutation(SUBMIT_ANSWER);

    const submitAnswer = async () => {
        const { data } = await _submitAnswer({ variables: { game_token: gameToken, question_id: id, answers: answers } });

        if (data.submitAnswer) setCanAnswer(false);
    };

    return (
        <div>
            {choices.map((text, idx) => {
                const checkboxOnChange = () => canAnswer && setAnswers(answers.includes(idx) ? answers.filter(val => val !== idx) : [...answers, idx]);
                const radioOnChange = () => canAnswer && setAnswers([idx]);

                return (
                    <QuizButton key={idx} color={idx} disabled={!canAnswer} onClick={type === 'single' ? radioOnChange : checkboxOnChange}>
                        {type === 'single' ? (
                            <Radio name="radio" checked={answers[0] === idx} onChange={radioOnChange} disabled={!canAnswer} />
                        ) : (
                            <Checkbox checked={answers.filter(val => val === idx).length > 0} onChange={checkboxOnChange} disabled={!canAnswer} />
                        )}
                        <h2>{text}</h2>
                    </QuizButton>
                );
            })}
            <Button onClick={submitAnswer}>Submit answer</Button>
        </div>
    );
};

export default QuestionPage;
