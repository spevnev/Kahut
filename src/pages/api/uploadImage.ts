import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests are allowed!' });

    const body = req.body;
    console.log(body);

    res.status(200);
};

export default handler;
