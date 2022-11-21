import { GetServerSideProps, NextPage } from 'next';
import GameCard from '../types/gameCard';
import GameBrowser from './games';

const UsersGames: NextPage<{ cards: GameCard[] }> = ({ cards }) => <GameBrowser cards={cards} showMyGames={true} />;

export const getServerSideProps: GetServerSideProps = async ({}) => {
    // TODO: fetch user's games
    return { props: { cards: [] } };
};

export default UsersGames;
