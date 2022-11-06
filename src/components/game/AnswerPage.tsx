import { FunctionComponent } from 'react';
import { GamePageProps, ShowAnswerData } from '../../pages/lobby/[code]';
import Player from '../../types/player';

type Props = GamePageProps & ShowAnswerData & { players: Player[] };

const AnswerPage: FunctionComponent<Props> = ({}) => {
    // show correct answer for 5s then leaderboard for 5s

    return <div></div>;
};

export default AnswerPage;
