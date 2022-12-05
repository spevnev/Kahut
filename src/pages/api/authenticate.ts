import { NextApiHandler } from 'next';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { createJwt } from '../../utils/jwt';

const client = new OAuth2Client({
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_SECRET,
});

const handler: NextApiHandler = async (request, response) => {
    const { token } = request.query;
    if (typeof token !== 'string') return response.status(400);

    let payload: TokenPayload | undefined;
    try {
        const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.OAUTH_CLIENT_ID });
        payload = ticket.getPayload();

        if (!payload) return response.status(400);
    } catch {
        return response.status(400);
    }

    const { name, picture, email, email_verified } = payload;
    if (!email_verified) return response.status(400);

    const jwtToken = await createJwt({ name, picture, email });

    response.status(200).send({ token: jwtToken });
};

export default handler;
