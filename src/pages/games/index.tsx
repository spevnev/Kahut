import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { v4 as generateUUID } from 'uuid';
import GameCardType from '../../types/gameCard';
import GameCard from '../../components/gameBrowser/GameCard';
import Header from '../../components/Header';
import SearchBar from '../../components/gameBrowser/SearchBar';
import { color } from '../../styles/theme';
import { useRouter } from 'next/router';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vw;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, max(min(15vw, 300px), 200px));
    grid-gap: max(min(2vw, 50px), 5px);
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-top: 1vw;
`;

const CreateButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 32px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 200;
    border: none;
    outline: none;
    background: ${color('frost1')};
    color: ${color('white1')};
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: ${color('frost0')};
    }
`;

type Props = {
    cards: GameCardType[];
    showMyGames?: boolean;
};

const GameBrowser: NextPage<Props> = ({ cards, showMyGames }) => {
    const router = useRouter();
    const [showFilters, setShowFilters] = useState(false);

    const createGame = async () => {
        // TODO: is it sufficient to just generate uuid here and only register game when user makes any changes?
        router.push(`/edit/${generateUUID()}`);
    };

    return (
        <>
            <Header />

            <Container onClick={e => setShowFilters((e.nativeEvent.composedPath() as HTMLElement[]).filter(el => el.id === 'searchbar').length > 0)}>
                {!showMyGames && <SearchBar showFilters={showFilters} hideFilters={() => setShowFilters(false)} />}

                <Cards>
                    {cards.map(card => (
                        <GameCard {...card} key={card.id} />
                    ))}
                </Cards>

                {showMyGames && <CreateButton onClick={createGame}>Create Game +</CreateButton>}
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
    return { props: { cards: [] } };
};

export default GameBrowser;
