import { gql, useSubscription, useMutation } from '@apollo/client';
import { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import { getCookie } from '../../utils/cookies';
import GameToken from '../../types/gameToken';

const START_GAME = gql`
    mutation startLobby($game_token: String!) {
        startLobby(game_token: $game_token)
    }
`;

const GAME_SUBSCRIPTION = gql`
    subscription gameSubscription($game_token: String!) {
        onGameEvent(game_token: $game_token) {
            event
            data {
                title
                image
            }
        }
    }
`;

type Props = { gameToken: string };

const Game: NextPage<Props> = ({ gameToken }) => {
    const game_token = getCookie('game_token') || gameToken;
    const { isHost } = jwt.decode(gameToken) as GameToken;

    const [startGame] = useMutation(START_GAME, { variables: { game_token } });
    const { data: subscriptionData } = useSubscription(GAME_SUBSCRIPTION, { variables: { game_token } });
    const { event, data } = subscriptionData?.onGameEvent || { event: null, data: null };

    return (
        <div>
            {isHost && <button onClick={() => startGame()}>START</button>}
            <h1>{event === 'START' && data.title}</h1>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const gameToken = req?.cookies?.game_token;
    if (!gameToken || (jwt.decode(gameToken) as GameToken).code !== query.code) return { notFound: true };

    // TODO: return {notFound: true} if there is no such pending game

    return { props: { gameToken } };
};

export default Game;
