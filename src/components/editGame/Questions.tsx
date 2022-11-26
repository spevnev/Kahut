import { FunctionComponent, useState } from 'react';
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
    const [openedQuestions, setOpenedQuestions] = useState(questionNum ? new Array(game.questions[questionNum - 1].index + 1).fill(false) : []);

    const newQuestion = () => {
        const maxIndex = game.questions.reduce((max, cur) => Math.max(max, cur.index), -1);

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

        setOpenedQuestions([...openedQuestions, true]);
    };

    const setOpenedQuestion = (elIdx: number, newValue: boolean) => setOpenedQuestions(openedQuestions.map((cur, idx) => (idx === elIdx ? newValue : cur)));

    const deleteQuestion = (index: number) => setGame({ ...game, questions: game.questions.filter(question => question.index !== index) });

    return (
        <div>
            {game.questions.map(question =>
                openedQuestions[question.index] ? (
                    <Question
                        key={question.id}
                        question={question}
                        setQuestion={new_question => setGame({ ...game, questions: game.questions.map(cur => (cur.index === question.index ? new_question : cur)) })}
                        closeQuestion={() => setOpenedQuestion(question.index, false)}
                        deleteQuestion={() => deleteQuestion(question.index)}
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
