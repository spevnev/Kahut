import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import GameCardType from '../../types/gameCard';
import GameCard from '../../components/gameBrowser/GameCard';
import Header from '../../components/Header';
import User from '../../types/user';
import SearchBar from '../../components/gameBrowser/SearchBar';

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

type Props = {
    user?: User;
    cards: GameCardType[];
    disableSearch?: boolean;
};

const GameBrowser: NextPage<Props> = ({ user, cards, disableSearch }) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <Header user={user} />

            <Container onClick={e => setShowFilters((e.nativeEvent.composedPath() as HTMLElement[]).filter(el => el.id === 'searchbar').length > 0)}>
                {!disableSearch && <SearchBar showFilters={showFilters} hideFilters={() => setShowFilters(false)} />}

                <Cards>
                    {cards.map(card => (
                        <GameCard {...card} key={card.id} />
                    ))}
                </Cards>
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
    return { props: { cards: [] } };
};

export default GameBrowser;
