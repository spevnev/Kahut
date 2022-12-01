import { useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { v4 as generateUUID } from 'uuid';
import { gql, useApolloClient } from '@apollo/client';
import GameInfo from '../../types/gameInfo';
import GameCard from '../../components/gameBrowser/GameCard';
import Header from '../../components/Header';
import SearchBar from '../../components/gameBrowser/SearchBar';
import { color } from '../../styles/theme';
import { useRouter } from 'next/router';
import createApolloClient from '../../graphql/apolloClient';
import useOnVisible from '../../hooks/useOnVisible';
import useDebounce from '../../hooks/useDebounce';

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

const GET_GAMES = gql`
    query getGames($after: String) {
        getGames(limit: 30, after: $after) {
            id
            title
            description
            image
            players
            questionNum
        }
    }
`;

type Props = {
    cards: GameInfo[];
    showMyGames?: boolean;
};

const GameBrowser: NextPage<Props> = ({ cards: _cards, showMyGames }) => {
    const router = useRouter();
    const apollo = useApolloClient();

    const [showFilters, setShowFilters] = useState(false);
    const [cards, setCards] = useState(_cards);

    const cardsRef = useRef<GameInfo[] | null>(cards);
    const loadMore = useDebounce<void>(
        async () => {
            const cards = cardsRef.current;
            if (cards === null) return;

            const { data } = await apollo.query({ query: GET_GAMES, variables: { after: cards[cards.length - 1].id } });
            const newCards = data.getGames;
            const allCards = [...cards, ...newCards];

            if (newCards.length === 0) {
                cardsRef.current = null;
                return;
            }

            setCards(allCards);
            cardsRef.current = allCards;
            wasSeen.current = false;
        },
        _ => _,
        333
    );
    const [lastCardRef, wasSeen] = useOnVisible({ callback: loadMore });

    const createGame = () => router.push(`/edit/${generateUUID()}`);

    return (
        <>
            <Header />
            <Container onClick={e => setShowFilters((e.nativeEvent.composedPath() as HTMLElement[]).filter(el => el.id === 'searchbar').length > 0)}>
                {!showMyGames && <SearchBar showFilters={showFilters} hideFilters={() => setShowFilters(false)} />}

                <Cards>
                    {cards.map((card, idx) => (
                        <GameCard {...card} key={card.id} ref={idx === Math.max(cards.length - 10, 0) ? lastCardRef : undefined} />
                    ))}
                </Cards>

                {showMyGames && <CreateButton onClick={createGame}>Create Game +</CreateButton>}
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const apollo = createApolloClient();
    const { data } = await apollo.query({ query: GET_GAMES });

    return { props: { cards: data.getGames } };
};

export default GameBrowser;
