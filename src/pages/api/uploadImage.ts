import { NextApiHandler } from 'next';
import sizeOf from 'image-size';
import FormData from 'form-data';
import axios from 'axios';
import { verifyJwt } from '../../utils/jwt';

const MIN_IMAGE_SIZE = [256, 256];
const MAX_IMAGE_SIZE = [2560, 1600];

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests are allowed!' });

    const { token } = req.cookies;
    if (!token || !(await verifyJwt(token))) return res.status(401).send({ message: 'Unauthorized' });

    let image = req.body;
    if (!image) return res.status(400).send({ message: 'Body must contain Base64 Encoded image!' });
    image = image.split(';base64,')[1];

    const { width, height } = sizeOf(Buffer.from(image, 'base64'));
    if (!width || !height) throw new Error('Image has no size!');
    if (width < MIN_IMAGE_SIZE[0] || height < MIN_IMAGE_SIZE[1])
        return res.status(400).send({ message: `Width must be <= ${MIN_IMAGE_SIZE[0]} and Height must be <= ${MIN_IMAGE_SIZE[1]}` });
    if (width > MAX_IMAGE_SIZE[0] || height > MAX_IMAGE_SIZE[1])
        return res.status(400).send({ message: `Width must be <= ${MAX_IMAGE_SIZE[0]} and Height must be <= ${MAX_IMAGE_SIZE[1]}` });

    if (!process.env.IMG_UPLOAD_API_KEY) throw new Error('Error - no image api key!');
    const payload = new FormData();
    payload.append('key', process.env.IMG_UPLOAD_API_KEY);
    payload.append('image', image);

    const { data } = await axios.post(`https://api.imgbb.com/1/upload`, payload, payload.getHeaders());

    res.status(200).send({ url: data.data.image.url });
};

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default handler;
