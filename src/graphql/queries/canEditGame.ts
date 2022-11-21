import jwt from 'jsonwebtoken';
import User from '../../types/user';
import { verifyJwt } from '../../utils/jwt';
import { ResolverContext } from '../apolloServer';

const GET_GAME_CREATOR = `SELECT creator FROM games WHERE id = $1;`;

type CanEditGameArgs = {
    id: string;
    token: string;
};

const canEditGame = async (_parent: void, { id, token }: CanEditGameArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!(await verifyJwt(token))) return false;
    const { email } = jwt.decode(token) as User;

    const { rows } = await db.query(GET_GAME_CREATOR, [id]);
    return rows.length === 0 || rows[0].creator === email;
};

export default canEditGame;
