import { gql, useSubscription } from '@apollo/client';
import { GetServerSideProps, NextPage } from 'next';
import { getCookie } from '../../utils/cookies';

const GAME_SUBSCRIPTION = gql`
    subscription gameSubscription($token: String!) {
        onGameEvent(token: $token)
    }
`;

type Props = { gameToken: string };

const Game: NextPage<Props> = ({ gameToken }) => {
    const { data } = useSubscription(GAME_SUBSCRIPTION, { variables: { token: getCookie('game_token') || gameToken } });

    return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const gameToken = req?.cookies?.game_token;
    if (!gameToken) return { notFound: true };

    // TODO: return {notFound: true} if there is no such pending game

    return { props: { gameToken } };
};

export default Game;
