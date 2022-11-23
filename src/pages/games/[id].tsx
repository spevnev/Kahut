import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import jwt from 'jsonwebtoken';
import { color } from '../../styles/theme';
import GameInfo from '../../types/gameInfo';
import Header from '../../components/Header';
import { AuthContext } from '../../providers/GoogleAuthProvider';
import { numberFormatter } from '../../utils/helper';
import { getCookie, setCookie } from '../../utils/cookies';
import GameTokenData from '../../types/gameTokenData';

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
    card: GameInfo;
    isCreator: boolean;
};

const CREATE_LOBBY_MUTATION = gql`
    mutation createLobby($game_id: String!, $token: String!) {
        createLobby(game_id: $game_id, token: $token) {
            code
            token
        }
    }
`;

const GameDetails: NextPage<Props> = ({ isCreator, card: { id, image, title, description, questions, players, rating, user: creator } }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [createLobby] = useMutation(CREATE_LOBBY_MUTATION);

    const startGame = async () => {
        if (!user) return;

        const { data } = await createLobby({ variables: { game_id: id, token: getCookie('token') } });

        const { code, token } = data.createLobby;
        if (!code || !token) return;

        const { exp } = jwt.decode(token) as GameTokenData;
        setCookie('game_token', token, new Date(exp * 1000).toUTCString());
        router.push(`/lobby/${code}`);
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
                <PrimaryButton onClick={startGame} disabled={!user}>
                    Host game
                </PrimaryButton>
            </Buttons>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // TODO: check if exists + get data
    const { id } = query;
    if (!id) return { notFound: true };

    return {
        props: {
            isCreator: false,
            card: {
                id,
                title: 'sth',
                rating: 4,
                questions: 7,
                players: 1,
                description: '',
                user: {
                    avatar: '',
                    username: 'sth',
                },
            },
        },
    };
};

export default GameDetails;
