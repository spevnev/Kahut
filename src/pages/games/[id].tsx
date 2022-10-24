import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { color } from '../../styles/theme';
import GameCard from '../../types/gameCard';
import Header from '../../components/Header';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`;

const ImageContainer = styled.div`
    width: 100vw;
    min-height: 35vh;
    max-height: 35vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: ${color('black2')};
    filter: brightness(0.9);
`;

const Details = styled.div`
    padding: 10px;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: 100;
    color: ${color('white0')};
    margin: 5px 0;
`;

const Description = styled.p`
    font-size: 18px;
    font-weight: 200;
    color: ${color('white1')};
`;

const Info = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${color('white2')};
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto 0 0 auto;
`;

const Button = styled.button`
    border: none;
    outline: none;
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 200;
    color: ${color('white1')};
    cursor: pointer;
    transition: background 0.2s;
    margin: 15px 10px;
`;

const PrimaryButton = styled(Button)`
    background: ${color('frost1')};
    width: 20vw;

    &:hover {
        background: ${color('frost0')};
    }
`;

const SecondaryButton = styled(Button)`
    background: ${color('black3')};
    width: 10vw;

    &:hover {
        background: ${color('black2')};
    }
`;

const User = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px 0;
`;

const Username = styled.p`
    font-size: 16px;
    font-weight: 200;
    color: ${color('white1')};
`;

const UserIcon = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
`;

type Props = {
    card: GameCard;
    isCreator: boolean;
};

const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });
const GameDetails: NextPage<Props> = ({ isCreator, card: { id, image, title, description, questions, players, rating, user: creator } }) => {
    const router = useRouter();

    const startGame = () => {
        // TODO: user ? redirect to lobby : < Popup text="you have to register to create game" />
    };

    return (
        <Container>
            <Header />

            <ImageContainer>
                <img style={{ width: '100%' }} src={image} alt="Game's image" />
            </ImageContainer>
            <Details>
                <Title>{title}</Title>
                <Info>
                    {rating} / 5 • {questions} questions • {numberFormatter.format(players)} players
                </Info>
                <Description>{description}</Description>
                <User>
                    <UserIcon src={creator.avatar} />
                    <Username>{creator.username}</Username>
                </User>
            </Details>

            <Buttons>
                {isCreator && <SecondaryButton onClick={() => router.push(`/edit/${id}`)}>Edit</SecondaryButton>}
                <PrimaryButton onClick={startGame}>Host game</PrimaryButton>
            </Buttons>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // TODO: check if exists + get data
    if (!query.id) return { notFound: true };

    return {
        props: {
            isCreator: false,
            card: {},
        },
    };
};

export default GameDetails;
