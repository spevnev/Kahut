import { GetServerSideProps, NextPage } from 'next';
import { AuthProps } from '../components/GoogleAuthProvider';
import GameCard from '../types/gameCard';
import GameBrowser from './games';

type Props = AuthProps & {
    cards: GameCard[];
};

const UsersGames: NextPage<Props> = props => <GameBrowser {...props} disableSearch={true} />;

export const getServerSideProps: GetServerSideProps = async ({}) => {
    // TODO: fetch user's games
    return { props: { cards: [] } };
};

export default UsersGames;
