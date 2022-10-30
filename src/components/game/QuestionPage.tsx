import { FunctionComponent, useContext } from 'react';
import { GameContext, ShowQuestionData } from '../../pages/lobby/[code]';

const QuestionPage: FunctionComponent<ShowQuestionData> = ({ title, image, type, choices, time }) => {
    const { gameToken, gameData } = useContext(GameContext);

    return <div></div>;
};

export default QuestionPage;
