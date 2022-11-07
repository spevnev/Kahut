import { useMutation } from '@apollo/client';
import { gql } from 'apollo-server-core';
import { FunctionComponent, useState } from 'react';
import { GamePageProps } from '../../pages/lobby/[code]';

const START_GAME = gql`
    mutation startLobby($game_token: String!) {
        startLobby(game_token: $game_token)
    }
`;

type Props = GamePageProps & {
    players: string[];
    closeLobby: () => void;
};

const Lobby: FunctionComponent<Props> = ({ players, gameToken, gameData, closeLobby }) => {
    const [_startGame] = useMutation(START_GAME, { variables: { game_token: gameToken } });
    const [canStart, setCanStart] = useState(gameData.isHost);

    const startGame = () => {
        _startGame();
        setCanStart(false);
        closeLobby();
    };

    return (
        <div>
            <div>
                {players.map(({ username }) => (
                    <p key={username}>{username}</p>
                ))}
            </div>
            {canStart && <button onClick={startGame}>START</button>}
        </div>
    );
};

export default Lobby;
