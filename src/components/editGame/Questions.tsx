import { Fragment } from 'react';
import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { v4 as generateUUID } from 'uuid';
import Game from '../../types/game';
import FoldedQuestion from './FoldedQuestion';
import Question, { QuestionContainer } from './Question';

const Container = styled.div``;

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
    const [openedQuestions, _setOpenedQuestions] = useState(new Array(game.questions.length).fill(false));

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

        _setOpenedQuestions([...openedQuestions, true]);
    };

    const setOpenedQuestions = (el_idx: number, new_value: boolean) => _setOpenedQuestions(openedQuestions.map((cur, idx) => (idx === el_idx ? new_value : cur)));

    return (
        <Container>
            {game.questions.map((question, idx) => (
                <Fragment key={question.id}>
                    {openedQuestions[idx] ? (
                        <Question
                            question={question}
                            setQuestion={new_question => setGame({ ...game, questions: game.questions.map((value, j) => (j === idx ? new_question : value)) })}
                            closeQuestion={() => setOpenedQuestions(idx, false)}
                        />
                    ) : (
                        <div onClick={() => setOpenedQuestions(idx, true)}>
                            <FoldedQuestion question={question} />
                        </div>
                    )}
                </Fragment>
            ))}
            <NewQuestion onClick={newQuestion}>New Question</NewQuestion>
        </Container>
    );
};

export default Questions;
