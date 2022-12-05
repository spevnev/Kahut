import jwt from 'jsonwebtoken';
import { ResolverContext } from '../../pages/api/graphql';
import GameToken from '../../types/gameTokenData';
import { verifyJwt } from '../../utils/jwt';

const SUBMIT_ANSWER = `
    INSERT INTO answers(username, lobby_id, question_id, answers)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT DO NOTHING;
`;

type SubmitAnswerArgs = {
    game_token: string;
    question_id: string;
    answers: number[];
};

const submitAnswer = async (_parent: void, { game_token, question_id, answers }: SubmitAnswerArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(game_token))) return false;
    const { username, code } = jwt.decode(game_token) as GameToken;

    const response = await db.query(SUBMIT_ANSWER, [username, code, question_id, answers]);

    return response.rowCount === 1;
};

export default submitAnswer;
