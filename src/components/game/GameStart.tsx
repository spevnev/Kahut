import { FunctionComponent, useContext } from 'react';
import { GameContext, StartGameData } from '../../pages/lobby/[code]';

const GameStart: FunctionComponent<StartGameData> = ({ title, image }) => {
    const { gameToken, gameData } = useContext(GameContext);

    return <div></div>;
};

export default GameStart;
