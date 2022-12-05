import Game from '../../types/game';
import canEditGame from '../queries/canEditGame';
import jwt from 'jsonwebtoken';
import User from '../../types/user';
import { ResolverContext } from '../../pages/api/graphql';

const EDIT_GAME = `
    INSERT INTO games(id, title, description, image, creator)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT(id) DO UPDATE
    SET title = $2, description = $3, image = $4;
`;

type EditGameArgs = {
    token: string;
    game: Game;
};

const editGame = async (_parent: void, { token, game }: EditGameArgs, { db }: ResolverContext): Promise<boolean> => {
    if (!canEditGame(_parent, { token, id: game.id }, { db } as ResolverContext)) return false;
    if (game.image && game.image.length > 256) return false;

    const { email } = jwt.decode(token) as User;
    await db.query(EDIT_GAME, [game.id, game.title, game.description, game.image, email]);

    return true;
};

export default editGame;
