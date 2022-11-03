import { FunctionComponent } from 'react';
import { EndGameData, GamePageProps } from '../../pages/lobby/[code]';
import { Player } from './Lobby';

type Props = GamePageProps & EndGameData & { players: Player[] };

const GameEnd: FunctionComponent<Props> = ({}) => {
    return <div></div>;
};

export default GameEnd;
