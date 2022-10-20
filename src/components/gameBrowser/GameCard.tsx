import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import GameCardProps from '../../types/gameCard';
import { color } from '../../styles/theme';
import starIcon from '../../../public/icons/star.svg';
import { limitStringTo } from '../../utils/helper';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 200px;
    width: 15vw;
    max-width: 300px;
    height: 275px;
    background: ${color('black0')};
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    min-height: 150px;
    max-height: 150px;
    display: flex;
    justify-content: center;
    background: ${color('black2')};
`;

const Icon = styled.img`
    width: 10px;
    height: 10px;
    margin-left: 2px;
`;

const TextContainer = styled.div`
    padding: 6px 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.p`
    font-size: 12px;
    font-weight: 200;
    color: ${color('white0')};
    letter-spacing: -0.2px;
    margin: 2px 0;
`;

const Description = styled.p`
    font-size: 10px;
    font-weight: 200;
    color: ${color('white1')};
    letter-spacing: -0.1px;
`;

const SecondaryText = styled.p`
    font-size: 9px;
    font-weight: 300;
    color: ${color('white2')};
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 0;
`;

const UserIcon = styled.img`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 5px;
`;

const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });
const GameCard: FunctionComponent<GameCardProps> = ({ image, title, description, id, questions, players, rating, user }) => {
    const router = useRouter();

    return (
        <Container onClick={() => router.push(`/games/${id}`)}>
            <ImageContainer>
                <img style={{ height: '100%' }} src={image} alt="Game card's image" />
            </ImageContainer>

            <TextContainer>
                <div>
                    <Row>
                        <SecondaryText>
                            {questions} questions • {numberFormatter.format(players)} players • {rating} / 5
                        </SecondaryText>
                        <Icon src={starIcon.src} />
                    </Row>

                    <Title>{limitStringTo(title, 60)}</Title>
                    <Description>{limitStringTo(description, 150)}</Description>
                </div>

                <Row>
                    <UserIcon src={user.avatar} />
                    <SecondaryText>{user.username}</SecondaryText>
                </Row>
            </TextContainer>
        </Container>
    );
};

export default GameCard;
