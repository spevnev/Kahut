import jwt from 'jsonwebtoken';
import Question from '../../types/question';
import User from '../../types/user';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const EDIT_QUESTION_IF_CREATOR = `
    WITH game AS (
        SELECT (count(1) = 0) AS can_edit
        FROM games WHERE id = $2 AND creator != $10
    )
    INSERT INTO questions(id, game_id, index, title, type, image, time, choices, answers)
    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9 
    FROM game WHERE can_edit
    ON CONFLICT(id) DO UPDATE
    SET title = $4, type = $5, image = $6, time = $7, choices = $8, answers = $9;
`;

type EditQuestionArgs = {
    token: string;
    id: string;
    question: Question;
};

const editQuestion = async (_parent: void, { token, id, question }: EditQuestionArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(token))) return false;
    const { email } = jwt.decode(token) as User;

    const res = await db.query(EDIT_QUESTION_IF_CREATOR, [
        question.id,
        id,
        question.index,
        question.title,
        question.type,
        question.image,
        question.time,
        question.choices,
        question.answers,
        email,
    ]);

    return res.rowCount === 1;
};

export default editQuestion;
