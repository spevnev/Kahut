import jwt from 'jsonwebtoken';
import { ResolverContext } from '../../pages/api/graphql';
import Question from '../../types/question';
import User from '../../types/user';
import { verifyJwt } from '../../utils/jwt';

const EDIT_QUESTION_IF_CREATOR = `
    WITH game AS (
        SELECT (COUNT(1) = 0) AS can_edit
        FROM games
        WHERE id = $2 AND creator != $10
    ), question AS (
        SELECT (COUNT(1) = 1) AS exists
        FROM questions
        WHERE id = $1
    ), update_game AS (
        UPDATE games
        SET question_num = question_num + 1
        FROM question, game
        WHERE id = $2 AND game.can_edit AND NOT question.exists
    ), update_question AS (
        UPDATE questions
        SET title = $4, type = $5, image = $6, time = $7, choices = $8, answers = $9
        FROM question
        WHERE question.exists AND id = $1
    )
    INSERT INTO questions(id, game_id, index, title, type, image, time, choices, answers)
    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
    FROM game, question
    WHERE game.can_edit AND NOT question.exists;
`;

type EditQuestionArgs = {
    token: string;
    id: string;
    question: Question;
};

const editQuestion = async (_parent: void, { token, id, question }: EditQuestionArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(token))) return false;
    const { email } = jwt.decode(token) as User;

    const { index, title, type, image, time, choices, answers } = question;
    const response = await db.query(EDIT_QUESTION_IF_CREATOR, [question.id, id, index, title, type, image, time, choices, answers, email]);

    return response.rowCount === 1;
};

export default editQuestion;