import { gql, useSubscription } from '@apollo/client';
import { GetServerSideProps, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import GameTokenData from '../../types/gameToken';
import { createContext, useEffect, useRef } from 'react';
import Lobby, { Player } from '../../components/game/Lobby';
import QuestionPage from '../../components/game/QuestionPage';
import GameStart from '../../components/game/GameStart';
import GameEnd from '../../components/game/GameEnd';
import Leaderboard from '../../components/game/Leaderboard';

const GAME_SUBSCRIPTION = gql`
    subscription gameSubscription($game_token: String!) {
        onGameEvent(game_token: $game_token) {
            event
            data
        }
    }
`;

export type PlayerJoiningData = {};

export type StartGameData = {
    title: string;
    image: string;
};

export type ShowQuestionData = {
    title: string;
    image?: string;
    choices: string[];
    type: string;
    time: number;
};

export type ShowAnswerData = {};

export type EndGameData = {};

type ParseEvent = (res?: { onGameEvent?: { event: string; data: string } }) => {
    playerJoining?: PlayerJoiningData;
    startGame?: StartGameData;
    showQuestion?: ShowQuestionData;
    showAnswer?: ShowAnswerData;
    endGame?: EndGameData;
    idle?: boolean;
};

const parseEvent: ParseEvent = res => {
    if (!res || !res.onGameEvent) return { idle: true };

    const { event, data: _data } = res.onGameEvent;
    const data = JSON.parse(_data);

    switch (event) {
        case 'PLAYER_JOINING':
            return { playerJoining: data };
        case 'START_GAME':
            return { startGame: data };
        case 'SHOW_QUESTION':
            return { showQuestion: data };
        case 'SHOW_ANSWER':
            return { showAnswer: data };
        case 'END_GAME':
            return { endGame: data };
    }

    return { idle: true };
};

// @ts-ignore
export const GameContext = createContext<{ gameToken: string; gameData: GameTokenData }>({});

type Props = {
    gameToken: string;
    players: Player[];
};

const Game: NextPage<Props> = ({ gameToken, players: _players }) => {
    const gameData = jwt.decode(gameToken) as GameTokenData;

    const { data } = useSubscription(GAME_SUBSCRIPTION, { variables: { game_token: gameToken } });
    const { idle, playerJoining, startGame, showQuestion, showAnswer, endGame } = parseEvent(data);

    const players = useRef(_players);

    useEffect(() => {
        if (!playerJoining) return;

        // TODO: add to players, e.g.:
        // players.current.push(playerJoining.player);
    }, [playerJoining]);

    return (
        <GameContext.Provider value={{ gameToken, gameData }}>
            {idle && <Lobby players={players.current} />}
            {startGame && <GameStart {...startGame} />}
            {showQuestion && <QuestionPage {...showQuestion} />}
            {showAnswer && <Leaderboard {...showAnswer} />}
            {endGame && <GameEnd {...endGame} />}
        </GameContext.Provider>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const gameToken = req?.cookies?.game_token;
    if (!gameToken || (jwt.decode(gameToken) as GameTokenData).code !== query.code) return { notFound: true };

    // TODO: return {notFound: true} if there is no such pending game
    // const apollo = createApolloClient();

    // TODO: fetch on server side players who are already in lobby
    const players: Player[] = [];

    return { props: { gameToken, players } };
};

export default Game;
