import QuizButton from '../QuizButton';
import styled from 'styled-components';

const FakeQuizButton = styled(QuizButton)`
    cursor: default;
    width: 22.5vw;

    &:hover {
        filter: brightness(1);
    }
`;

export default FakeQuizButton;
