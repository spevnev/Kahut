import jwt from 'jsonwebtoken';
import { ResolverContext } from '../../pages/api/graphql';
import User from '../../types/user';
import { verifyJwt } from '../../utils/jwt';

const DELETE_QUESTION_IF_CREATOR = `
    WITH game AS (
        SELECT (COUNT(1) = 0) AS can_edit
        FROM games WHERE id = $2 AND creator != $3
    ), update_game AS (
        UPDATE games
        SET question_num = question_num - 1
        FROM game
        WHERE id = $2 AND game.can_edit
    )
    DELETE FROM questions
    WHERE id = $1 AND game_id = $2 AND (SELECT game.can_edit FROM game);
`;

type DeleteQuestionArgs = {
    token: string;
    game_id: string;
    question_id: string;
};

const deleteQuestion = async (_parent: void, { token, game_id, question_id }: DeleteQuestionArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(token))) return false;
    const { email } = jwt.decode(token) as User;

    const res = await db.query(DELETE_QUESTION_IF_CREATOR, [question_id, game_id, email]);

    return res.rowCount === 1;
};

export default deleteQuestion;
