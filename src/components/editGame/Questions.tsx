import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { v4 as generateUUID } from 'uuid';
import Game from '../../types/game';
import FoldedQuestion from './FoldedQuestion';
import Question, { QuestionContainer } from './Question';

const NewQuestion = styled(QuestionContainer)`
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

type Props = {
    game: Game;
    setGame: (game: Game) => void;
};

const Questions: FunctionComponent<Props> = ({ game, setGame }) => {
    const questionNum = game.questions.length;
    const [isQuestionOpened, setIsQuestionOpened] = useState(questionNum ? Array.from({ length: game.questions[questionNum - 1].index + 1 }).fill(false) : []);

    const newQuestion = () => {
        const maxIndex = game.questions.reduce((max, current) => Math.max(max, current.index), -1); // eslint-disable-line unicorn/no-array-reduce

        setGame({
            ...game,
            questions: [
                ...game.questions,
                {
                    id: generateUUID(),
                    title: 'New Question',
                    type: 'single',
                    time: 20,
                    choices: ['', '', '', ''],
                    answers: [0],
                    image: undefined,
                    index: maxIndex + 1,
                },
            ],
        });

        setIsQuestionOpened([...isQuestionOpened, true]);
    };

    const setOpenedQuestion = (searchedIndex: number, newValue: boolean) =>
        setIsQuestionOpened(isQuestionOpened.map((currentValue, index) => (index === searchedIndex ? newValue : currentValue)));

    return (
        <div>
            {game.questions.map(question =>
                isQuestionOpened[question.index] ? (
                    <Question
                        key={question.id}
                        question={question}
                        setQuestion={new_question =>
                            setGame({ ...game, questions: game.questions.map(currentIndex => (currentIndex.index === question.index ? new_question : currentIndex)) })
                        }
                        closeQuestion={() => setOpenedQuestion(question.index, false)}
                        deleteQuestion={() => setGame({ ...game, questions: game.questions.filter(({ index: currentIndex }) => currentIndex !== question.index) })}
                    />
                ) : (
                    <div key={question.id} onClick={() => setOpenedQuestion(question.index, true)}>
                        <FoldedQuestion question={question} />
                    </div>
                )
            )}
            <NewQuestion onClick={newQuestion}>New Question</NewQuestion>
        </div>
    );
};

export default Questions;
