import { useMutation } from '@apollo/client';
import { gql } from 'apollo-server-core';
import { FunctionComponent } from 'react';
import { GamePageProps } from '../../pages/lobby/[code]';
import Player from '../../types/player';

const START_GAME = gql`
    mutation startLobby($game_token: String!) {
        startLobby(game_token: $game_token)
    }
`;

type Props = GamePageProps & { players: Player[] };

const Lobby: FunctionComponent<Props> = ({ players, gameToken, gameData }) => {
    const [startGame] = useMutation(START_GAME, { variables: { game_token: gameToken } });

    return <div>{gameData.isHost && <button onClick={() => startGame()}>START</button>}</div>;
};

export default Lobby;
