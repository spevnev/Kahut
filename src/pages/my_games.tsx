import { GetServerSideProps, NextPage } from 'next';
import GameInfo from '../types/gameInfo';
import GameBrowser from './games';

const UsersGames: NextPage<{ cards: GameInfo[] }> = ({ cards }) => <GameBrowser cards={cards} showMyGames={true} />;

export const getServerSideProps: GetServerSideProps = async () => {
    // TODO: fetch user's games
    return { props: { cards: [] } };
};

export default UsersGames;
