import { useMutation } from '@apollo/client';
import { gql } from 'apollo-server-core';
import { FunctionComponent, useContext } from 'react';
import { GameContext } from '../../pages/lobby/[code]';

const START_GAME = gql`
    mutation startLobby($game_token: String!) {
        startLobby(game_token: $game_token)
    }
`;

export type Player = {};

type Props = { players: Player[] };

const Lobby: FunctionComponent<Props> = ({ players }) => {
    const { gameToken, gameData } = useContext(GameContext);
    const [startGame] = useMutation(START_GAME, { variables: { game_token: gameToken } });

    return <div>{gameData.isHost && <button onClick={() => startGame()}>START</button>}</div>;
};

export default Lobby;
