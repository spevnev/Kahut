import { FunctionComponent } from 'react';
import { GamePageProps, ShowAnswerData } from '../../pages/lobby/[code]';

type Props = GamePageProps & ShowAnswerData & { players: string[] };

const AnswerPage: FunctionComponent<Props> = ({}) => {
    // show correct answer for 5s then leaderboard for 5s

    return (
        <div>
            <h1>answers</h1>
        </div>
    );
};

export default AnswerPage;
