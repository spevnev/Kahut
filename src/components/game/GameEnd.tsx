import { FunctionComponent, useContext } from 'react';
import { EndGameData, GameContext } from '../../pages/lobby/[code]';

const GameEnd: FunctionComponent<EndGameData> = ({}) => {
    const { gameToken, gameData } = useContext(GameContext);

    return <div></div>;
};

export default GameEnd;
