import jwt from 'jsonwebtoken';
import User from '../../types/user';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const DELETE_QUESTION_IF_CREATOR = `
    DELETE FROM questions
    WHERE id = $1 AND game_id = $2 AND (
        SELECT (count(1) = 0) FROM games
        WHERE id = $2 AND creator != $3
    );
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
