import { NextApiHandler } from 'next';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client({ clientId: process.env.OAUTH_CLIENT_ID, clientSecret: process.env.OAUTH_SECRET });

const handler: NextApiHandler = async (req, res) => {
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

    const { name, picture, email, email_verified } = payload;
    if (!email_verified) return res.status(400);

    // TODO: login/signup + create jwt

    res.status(200).send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vZXh0ZXJuYWwtY29udGVudC5kdWNrZHVja2dvLmNvbS9pdS8_dT1odHRwcyUzQSUyRiUyRnNwbmcucG5nZmluZC5jb20lMkZwbmdzJTJGcyUyRjYxMC02MTA0NDUxX2ltYWdlLXBsYWNlaG9sZGVyLXBuZy11c2VyLXByb2ZpbGUtcGxhY2Vob2xkZXItaW1hZ2UtcG5nLnBuZyZmPTEmbm9mYj0xJmlwdD04Y2FhYWViZjMwOGM4ZjViZWU5OWZhYmFhZjk5MGEzMWIwZDUyYzk5YmRlYWJmNmU0NWY4M2NjZWFjNmIxMjg4Jmlwbz1pbWFnZXMifQ.ia6bcZyfX-mgY6LavUtRfOUVlBs6DvUqNoS0gxdaA54',
    });
};

export default handler;
