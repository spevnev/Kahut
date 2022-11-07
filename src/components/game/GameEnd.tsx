import { FunctionComponent } from 'react';
import { EndGameData, GamePageProps } from '../../pages/lobby/[code]';

type Props = GamePageProps & EndGameData & { players: string[] };

const GameEnd: FunctionComponent<Props> = ({}) => {
    return <div>end</div>;
};

export default GameEnd;
