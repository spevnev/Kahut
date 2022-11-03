import { FunctionComponent } from 'react';
import { GamePageProps, ShowAnswerData } from '../../pages/lobby/[code]';
import { Player } from './Lobby';

type Props = GamePageProps & ShowAnswerData & { players: Player[] };

const Leaderboard: FunctionComponent<Props> = ({}) => {
    return <div></div>;
};

export default Leaderboard;
