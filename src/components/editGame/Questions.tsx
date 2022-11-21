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
    const [openedQuestions, setOpenedQuestions] = useState(new Array(game.questions.length).fill(false));

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
        <Container>
            {game.questions.map(question => (
                <Fragment key={question.id}>
                    {openedQuestions[question.index] ? (
                        <Question
                            question={question}
                            setQuestion={new_question =>
                                setGame({ ...game, questions: game.questions.map((value, j) => (j === question.index ? new_question : value)) })
                            }
                            closeQuestion={() => setOpenedQuestion(question.index, false)}
                            deleteQuestion={() => deleteQuestion(question.index)}
                        />
                    ) : (
                        <div onClick={() => setOpenedQuestion(question.index, true)}>
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
