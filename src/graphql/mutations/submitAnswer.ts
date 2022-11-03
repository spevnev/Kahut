import jwt from 'jsonwebtoken';
import GameToken from '../../types/gameToken';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const SUBMIT_ANSWER = `INSERT INTO answers(username, lobby_id, question_id, answered_at, answers) values ($1, $2, $3, $4, $5);`;

type SubmitAnswerArgs = {
    game_token: string;
    question_id: string;
    answers: number[];
};

const submitAnswer = async (_parent: void, { game_token, question_id, answers }: SubmitAnswerArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(game_token))) return false;
    const { username, code } = jwt.decode(game_token) as GameToken;

    const res = await db.query(SUBMIT_ANSWER, [username, code, question_id, Date.now(), answers]);
    return res.rowCount === 1;
};

export default submitAnswer;
