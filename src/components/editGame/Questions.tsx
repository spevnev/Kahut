import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { v4 as generateUUID } from 'uuid';
import GameData from '../../types/gameData';
import Question, { QuestionContainer } from './Question';

const Container = styled.div``;

type Props = {
    game: GameData;
    setGame: (game: GameData) => void;
};

const Questions: FunctionComponent<Props> = ({ game, setGame }) => {
    const newQuestion = () => {
        setGame({
            ...game,
            questions: [
                ...game.questions,
                {
                    id: generateUUID(),
                    title: 'New Question',
                    type: 'radio',
                    time: 30,
                    answers: ['1', '2', '3', '4'],
                    correctAnswer: [1],
                    image: undefined,
                },
            ],
        });
    };

    return (
        <Container>
            {game.questions.map(question => (
                <Question
                    key={question.id}
                    question={question}
                    setQuestion={value => setGame({ ...game, questions: game.questions.map(cur => (cur === question ? value : cur)) })}
                />
            ))}
            <QuestionContainer onClick={newQuestion}>+</QuestionContainer>
        </Container>
    );
};

export default Questions;
