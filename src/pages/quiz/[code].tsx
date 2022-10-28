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
    console.log(data);

    return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    // TODO: return {notFound: true} if there is no such pending game
    return { props: { gameToken: req.cookies.game_token } };
};

export default Game;
