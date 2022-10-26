import styled from 'styled-components';
import { FunctionComponent } from 'react';
import { Question as QuestionType } from '../../types/gameData';
import clockIcon from '../../../public/icons/clock.svg';
import { color } from '../../styles/theme';

const Container = styled.div`
    width: 100%;
    max-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${color('black0')};
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin: 8px 0;
`;

const Image = styled.img`
    max-width: 100px;
    max-height: 100px;
    height: 100%;
    margin-right: 10px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Title = styled.p`
    font-size: 18px;
    font-weight: 100;
    color: ${color('white0')};
    letter-spacing: -0.3px;
`;

const Type = styled.p`
    font-size: 12px;
    font-weight: 300;
    color: ${color('white1')};
    line-height: calc(100% - 5px);
`;

const Time = styled.p`
    font-size: 16px;
    font-weight: 200;
    color: ${color('white1')};
    margin-right: 5px;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

type Props = { question: QuestionType };

const FoldedQuestion: FunctionComponent<Props> = ({ question: { image, title, type, time } }) => (
    <Container>
        <Row>
            {image && <Image src={image} />}
            <div>
                <Title>{title}</Title>
                <Type>{type}</Type>
            </div>
        </Row>

        <Row>
            <Time>{time}s</Time>
            <Icon src={clockIcon.src} />
        </Row>
    </Container>
);

export default FoldedQuestion;
