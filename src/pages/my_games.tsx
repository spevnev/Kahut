import { GetServerSideProps, NextPage } from 'next';
import GameCard from '../types/gameCard';
import User from '../types/user';
import GameBrowser from './games';

type Props = {
    user?: User;
    cards: GameCard[];
};

const UsersGames: NextPage<Props> = ({ cards, user }) => <GameBrowser user={user} cards={cards} disableSearch={true} />;

export const getServerSideProps: GetServerSideProps = async ({}) => {
    // fetch user's games
    return { props: { cards: [] } };
};

export default UsersGames;
