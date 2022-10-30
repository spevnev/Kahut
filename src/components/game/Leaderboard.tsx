import { FunctionComponent, useContext } from 'react';
import { GameContext, ShowAnswerData } from '../../pages/lobby/[code]';

const Leaderboard: FunctionComponent<ShowAnswerData> = ({}) => {
    const { gameToken, gameData } = useContext(GameContext);

    return <div></div>;
};

export default Leaderboard;
