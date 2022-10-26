import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import { Question as QuestionType } from '../../types/gameData';
import clockIcon from '../../../public/icons/clock.svg';
import chevronIcon from '../../../public/icons/chevron.svg';
import ChangeableImage from '../ChangeableImage';
import InlineInput from '../InlineInput';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import FakeQuizButton from '../FakeQuizButton';

const Container = styled.div`
    width: 100%;
    max-height: 800px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${color('black0')};
    border-radius: 5px;
    padding: 8px 12px;
    position: relative;
    margin: 10px 0;
`;

const FoldButton = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
`;

const ImageContainer = styled.div`
    max-width: 480px;
    max-height: 270px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Title = styled(InlineInput)`
    font-size: 16px;
    font-weight: 200;
    margin: 8px 0;
    color: ${color('white0')};
`;

const Time = styled(InlineInput)`
    font-size: 16px;
    font-weight: 200;
    width: 40px;
    color: ${color('white1')};
`;

const Icon = styled.img`
    margin-right: 3px;
    width: 20px;
    height: 20px;
`;

const Choices = styled.div`
    margin: 20px 10px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Choice = styled(FakeQuizButton)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px 0;

    & img {
        display: none;
    }
`;

const ChoiceInput = styled(InlineInput)`
    font-size: 16px;
    font-weight: 200;
    color: ${color('white1')};
`;

type Props = {
    question: QuestionType;
    setQuestion: (value: QuestionType) => void;
    closeQuestion: () => void;
};

const Question: FunctionComponent<Props> = ({ question, setQuestion, closeQuestion }) => (
    <Container>
        <FoldButton src={chevronIcon.src} onClick={closeQuestion} />
        <div>
            {question.image && (
                <ImageContainer>
                    <ChangeableImage src={question.image} onChange={image => setQuestion({ ...question, image })} />
                </ImageContainer>
            )}
            <Title placeholder="Title" value={question.title} onChange={e => setQuestion({ ...question, title: e.target.value })} maxLength={256} />
            <Row>
                <Row>
                    <Icon src={clockIcon.src} />
                    <Time
                        value={question.time}
                        onChange={e => {
                            const value = e.target.value.length === 0 ? 0 : Number(e.target.value);
                            if (Number.isNaN(value) || value > 300) return;
                            setQuestion({ ...question, time: value });
                        }}
                    />
                    <p>s</p>
                </Row>
                <Row>
                    <label style={{ fontSize: '14px', margin: '2px 5px 0 10px' }} htmlFor={`type-checkbox${question.id}`}>
                        Single
                    </label>
                    <Checkbox
                        id={`type-checkbox${question.id}`}
                        checked={question.type === 'single'}
                        onChange={() =>
                            setQuestion({
                                ...question,
                                type: question.type === 'single' ? 'multiple' : 'single',
                                answers: question.type !== 'single' ? [0] : [],
                            })
                        }
                    />
                </Row>
            </Row>
        </div>
        <Choices>
            {question.choices.map((choice, idx) => (
                <Choice key={idx} color={idx}>
                    {question.type === 'single' ? (
                        <Radio
                            style={{ margin: '0 2px 0 4px' }}
                            name={question.id}
                            checked={question.answers[0] === idx}
                            onChange={() => setQuestion({ ...question, answers: [idx] })}
                        />
                    ) : (
                        <Checkbox
                            style={{ margin: '0 4px' }}
                            checked={question.answers.filter(val => val === idx).length > 0}
                            onChange={e =>
                                setQuestion({
                                    ...question,
                                    answers: e.target.checked ? [...question.answers, idx] : question.answers.filter(val => val !== idx),
                                })
                            }
                        />
                    )}
                    <ChoiceInput
                        value={choice}
                        onChange={e => setQuestion({ ...question, choices: question.choices.map((value, j) => (j === idx ? e.target.value : value)) })}
                    />
                </Choice>
            ))}
        </Choices>
    </Container>
);

export const QuestionContainer = Container;
export default Question;
