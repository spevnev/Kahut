import { FunctionComponent, useState } from 'react';
import { GamePageProps, ShowQuestionData } from '../../pages/lobby/[code]';


type Props = GamePageProps & ShowQuestionData;

const QuestionPage: FunctionComponent<Props> = ({ id, title, image, type, choices, time, gameToken }) => {

    return (
        <div>
        </div>
    );
};

export default QuestionPage;
