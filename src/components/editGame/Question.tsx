import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import QuestionType from '../../types/question';
import clockIcon from '../../../public/icons/clock.svg';
import chevronIcon from '../../../public/icons/chevron.svg';
import trashIcon from '../../../public/icons/bin.svg';
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

const Buttons = styled.div`
    position: absolute;
    top: 8px;
    right: 4px;
    cursor: pointer;

    & img {
        width: 20px;
        height: 20px;
        margin: 0 4px;
    }
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

const TimeInput = styled(InlineInput)`
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
    max-width: 500px;
    width: 40vw;

    & img {
        display: none;
    }
`;

const ChoiceInput = styled(InlineInput)`
    font-size: 16px;
    font-weight: 200;
    color: ${color('white1')};
    margin-left: 5px;
`;

type Props = {
    question: QuestionType;
    setQuestion: (value: QuestionType) => void;
    closeQuestion: () => void;
    deleteQuestion: () => void;
};

const MAX_TIME_SECONDS = 300;

const Question: FunctionComponent<Props> = ({ question, setQuestion, closeQuestion, deleteQuestion }) => (
    <Container>
        <Buttons>
            <img src={trashIcon.src} onClick={deleteQuestion} />
            <img src={chevronIcon.src} onClick={closeQuestion} />
        </Buttons>
        <div>
            <ImageContainer>
                <ChangeableImage src={question.image} onChange={image => setQuestion({ ...question, image })} />
            </ImageContainer>
            <Title placeholder="Title" value={question.title} onChange={event => setQuestion({ ...question, title: event.target.value })} maxLength={256} />
            <Row>
                <Row>
                    <Icon src={clockIcon.src} />
                    <TimeInput
                        value={question.time}
                        onChange={event => {
                            const time = Number(event.target.value || 0);
                            if (!Number.isNaN(time) && time <= MAX_TIME_SECONDS) setQuestion({ ...question, time });
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
                        onChange={() => setQuestion({ ...question, type: question.type === 'single' ? 'multiple' : 'single', answers: [0] })}
                    />
                </Row>
            </Row>
        </div>
        <Choices>
            {question.choices.map((choice, index) => (
                <Choice key={index} color={index}>
                    {question.type === 'single' ? (
                        <Radio
                            style={{ margin: '0 2px 0 4px' }}
                            name={question.id}
                            checked={question.answers[0] === index}
                            onChange={() => setQuestion({ ...question, answers: [index] })}
                        />
                    ) : (
                        <Checkbox
                            style={{ margin: '0 4px' }}
                            checked={question.answers.includes(index)}
                            onChange={event =>
                                setQuestion({
                                    ...question,
                                    answers: event.target.checked ? [...question.answers, index] : question.answers.filter(value => value !== index),
                                })
                            }
                        />
                    )}
                    <ChoiceInput
                        value={choice}
                        onChange={event => setQuestion({ ...question, choices: question.choices.map((value, index2) => (index2 === index ? event.target.value : value)) })}
                    />
                </Choice>
            ))}
        </Choices>
    </Container>
);

export const QuestionContainer = Container;
export default Question;
