import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { v4 as generateUUID } from 'uuid';
import { gql, useApolloClient } from '@apollo/client';
import { ParsedUrlQuery } from 'querystring';
import GameInfo from '../../types/gameInfo';
import GameCard from '../../components/gameBrowser/GameCard';
import Header from '../../components/Header';
import SearchBar, { SearchOptions } from '../../components/gameBrowser/SearchBar';
import { color } from '../../styles/theme';
import createApolloClient from '../../graphql/apolloClient';
import useOnVisible from '../../hooks/useOnVisible';
import useDebounce from '../../hooks/useDebounce';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1vw;
    min-height: 100vw;
    overflow: hidden;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, max(min(15vw, 300px), 200px));
    grid-gap: max(min(2vw, 50px), 5px);
    justify-content: space-around;
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
    query getGames($prompt: String, $questionNum: Int!, $orderBy: String!, $sortingOrder: String!, $lastId: String, $lastValue: String) {
        getGames(limit: 30, prompt: $prompt, lastId: $lastId, lastValue: $lastValue, questionNum: $questionNum, orderBy: $orderBy, sortingOrder: $sortingOrder) {
            id
            title
            description
            image
            players
            questionNum
            createdAt
        }
    }
`;

type Props = {
    cards: GameInfo[];
    showMyGames?: boolean;
};

const getDefaultSearchOptions = (query: ParsedUrlQuery): SearchOptions => {
    const prompt = (query.prompt as string) || '';
    const filters = { questionNum: 'any', orderBy: 'players', sortingOrder: 'DESC', ...query, prompt: undefined };

    return { prompt, filters };
};

const GameBrowser: NextPage<Props> = ({ cards: _cards, showMyGames }) => {
    const router = useRouter();
    const apollo = useApolloClient();

    const [cards, setCards] = useState(_cards);
    const cardsRef = useRef(cards);

    const [areFiltersOpened, setAreFiltersOpened] = useState(false);
    const [searchOptions, setSearchOptions] = useState(getDefaultSearchOptions(router.query));
    const searchOptionsRef = useRef(searchOptions);

    const loadMore = useDebounce<void>(
        async () => {
            const cards = cardsRef.current;

            const searchOptions = searchOptionsRef.current;
            const prompt = searchOptions.prompt;
            const { questionNum: _questionNum, orderBy, sortingOrder } = searchOptions.filters;

            let questionNum = 0;
            if (showMyGames) questionNum = -1;
            if (_questionNum !== 'any') questionNum = Number(_questionNum);

            let lastValue, lastId;
            if (cards.length > 0) {
                const lastCard = cards[cards.length - 1];

                lastId = lastCard.id;

                switch (orderBy) {
                    case 'question_num': {
                        lastValue = lastCard.questionNum;
                        break;
                    }
                    case 'created_at': {
                        lastValue = lastCard.createdAt;
                        break;
                    }
                    case 'players': {
                        lastValue = lastCard.players;
                        break;
                    }
                }
                if (lastValue) lastValue = String(lastValue);
            }

            const { data } = await apollo.query({
                query: GET_GAMES,
                variables: { lastValue, lastId, questionNum, orderBy, sortingOrder, prompt },
                fetchPolicy: 'network-only',
            });
            const newCards = data.getGames;
            const allCards = [...cards, ...newCards];

            setCards(allCards);

            if (newCards.length > 0) {
                cardsRef.current = allCards;
                wasSeen.current = false;
            }
        },
        _ => _,
        333
    );
    const [lastCardRef, wasSeen] = useOnVisible({ callback: loadMore });

    useEffect(() => {
        if (showMyGames) return;

        searchOptionsRef.current = searchOptions;
        cardsRef.current = [];
        wasSeen.current = false;

        loadMore();

        router.replace({ pathname: router.pathname, query: { ...searchOptions.filters, prompt: searchOptions.prompt } });
    }, [searchOptions]);

    const createGame = () => router.push(`/edit/${generateUUID()}`);

    return (
        <Container onClick={event => setAreFiltersOpened((event.nativeEvent.composedPath() as HTMLElement[]).some(element => element.id === 'searchbar'))}>
            <Header />
            {!showMyGames && <SearchBar areFiltersOpened={areFiltersOpened} searchOptions={searchOptions} setSearchOptions={setSearchOptions} />}
            <Cards>
                {cards.map((card, index) => (
                    <GameCard {...card} key={card.id} ref={index === Math.max(cards.length - 10, 0) ? lastCardRef : undefined} />
                ))}
            </Cards>
            {showMyGames && <CreateButton onClick={createGame}>Create Game +</CreateButton>}
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (Object.keys(query).length > 0) return { props: { cards: [] } };

    const apollo = createApolloClient();
    const { data } = await apollo.query({ query: GET_GAMES, variables: { questionNum: 0, sortingOrder: 'DESC', orderBy: 'players' } });

    return { props: { cards: data.getGames } };
};

export default GameBrowser;
