import { gql, useMutation } from '@apollo/client';
import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { GamePageProps } from '../../pages/lobby/[code]';
import { color } from '../../styles/theme';
import StyledButton from '../Button';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
`;

const LobbyCode = styled.p`
    margin: 10px;
    width: fit-content;
    font-size: 20px;
    font-weight: 200;
    color: ${color('white0')};
    background: ${color('black3')};
    border-radius: 5px;
    padding: 4px 10px;
`;

const Title = styled.h1`
    font-weight: 100;
    font-size: 32px;
    letter-spacing: -0.5px;
    text-align: center;
    margin: 20px 0;

    @media (max-width: 800px) {
        margin: 0;
        font-size: 24px;
    }
`;

const StartGameButton = styled(StyledButton)`
    margin: 10px 10px 10px auto;
    width: fit-content;
`;

const Players = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    width: 75vw;
    max-height: 50vh;
    overflow-y: scroll;
    margin: auto auto 20px auto;
    background: ${color('black0')};
    border-radius: 3px;
    padding: 6px 12px;

    @media (max-width: 800px) {
        max-height: 60vh;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Player = styled.div`
    margin: 5px 10px;
    width: fit-content;
    height: fit-content;
    font-size: 16px;
    font-weight: 300;
    color: ${color('white1')};
    background: ${color('black2')};
    border-radius: 3px;
    padding: 2px 5px;
`;

const Counter = styled.p`
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 14px;
    font-weight: 300;
    color: ${color('white1')};
`;

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
        _startGame().then(() => closeLobby());
        setCanStart(false);
    };

    return (
        <Container>
            <LobbyCode>CODE: {gameData.code}</LobbyCode>

            <Title>Waiting for host to start the game...</Title>

            <Players>
                {players.map(username => (
                    <Player key={username}>{username}</Player>
                ))}
                <Counter>{players.length}</Counter>
            </Players>

            {canStart && <StartGameButton onClick={startGame}>Start Game</StartGameButton>}
        </Container>
    );
};

export default Lobby;
