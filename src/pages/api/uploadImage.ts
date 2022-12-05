import { NextApiHandler } from 'next';
import sizeOf from 'image-size';
import FormData from 'form-data';
import axios from 'axios';
import { verifyJwt } from '../../utils/jwt';

const uploadImageToImgbb = async (image: string): Promise<string> => {
    if (!process.env.IMG_UPLOAD_API_KEY) throw new Error('Error - no image api key!');

    const payload = new FormData();
    payload.append('key', process.env.IMG_UPLOAD_API_KEY);
    payload.append('image', image);

    const { data } = await axios.post(`https://api.imgbb.com/1/upload`, payload, payload.getHeaders());

    return data?.data?.image?.url;
};

const MIN_IMAGE_SIZE = [256, 256];
const MAX_IMAGE_SIZE = [2560, 1600];

const handler: NextApiHandler = async (request, response) => {
    if (request.method !== 'POST') return response.status(405).send({ message: 'Only POST requests are allowed!' });

    const { token } = request.cookies;
    if (!token || !(await verifyJwt(token))) return response.status(401).send({ message: 'Unauthorized' });

    let image = request.body;
    if (!image) return response.status(400).send({ message: 'Body must contain Base64 Encoded image!' });
    image = image.split(';base64,')[1];

    const { width, height } = sizeOf(Buffer.from(image, 'base64'));
    if (!width || !height || width < MIN_IMAGE_SIZE[0] || height < MIN_IMAGE_SIZE[1] || width > MAX_IMAGE_SIZE[0] || height > MAX_IMAGE_SIZE[1]) return response.status(400);

    const url = await uploadImageToImgbb(image);

    response.status(200).send({ url });
};

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default handler;
