import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import { Question as QuestionType } from '../../types/gameData';

const Container = styled.div`
    background: ${color('black0')};
`;

type Props = {
    question: QuestionType;
    setQuestion: (value: QuestionType) => void;
};

const Question: FunctionComponent<Props> = ({ question, setQuestion }) => (
    <Container>
        <h1>tests</h1>
    </Container>
);

export const QuestionContainer = Container;
export default Question;
