import { gql, useSubscription } from '@apollo/client';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getCookie } from '../../utils/cookies';

const GAME_SUBSCRIPTION = gql`
    subscription gameSubscription($code: String!, $token: String!) {
        onGameEvent(code: $code, token: $token)
    }
`;

type Props = { gameToken: string };

const Game: NextPage<Props> = ({ gameToken }) => {
    const router = useRouter();
    const { code } = router.query;
    const { data, loading } = useSubscription(GAME_SUBSCRIPTION, { variables: { code, token: getCookie('game_token') || gameToken } });

    console.log(loading, data);

    return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    // TODO: return {notFound: true} if there is no such pending game
    return { props: { gameToken: req.cookies.game_token } };
};

export default Game;
