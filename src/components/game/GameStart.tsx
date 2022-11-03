import { FunctionComponent } from 'react';
import { GamePageProps, StartGameData } from '../../pages/lobby/[code]';

type Props = GamePageProps & StartGameData;

const GameStart: FunctionComponent<Props> = ({ title, image }) => {
    return <div></div>;
};

export default GameStart;
