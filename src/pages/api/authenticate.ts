import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new OAuth2Client({ clientId: process.env.OAUTH_CLIENT_ID, clientSecret: process.env.OAUTH_SECRET, redirectUri: 'http://localhost:3000/' });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.query;
    if (typeof token !== 'string') return res.status(400);

    let ticket!: LoginTicket;
    let payload: TokenPayload | undefined;
    try {
        ticket = await client.verifyIdToken({ idToken: token, audience: process.env.OAUTH_CLIENT_ID });
        payload = ticket.getPayload();
        if (!payload) return res.status(400);
    } catch (e) {
        return res.status(400);
    }

    const { name, picture, email_verified } = payload;
    if (!email_verified) return res.status(400);

    // TODO: login/signup + create jwt

    res.status(200).send({ name, picture });
};

export default handler;
