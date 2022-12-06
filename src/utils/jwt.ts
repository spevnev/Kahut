import jwt from 'jsonwebtoken';

export const createJwt = (data: { [key: string]: any }, expiresIn?: number): Promise<string> => {
    const exp = Math.floor(Date.now() / 1000) + (expiresIn || 0);
    const payload = expiresIn ? { ...data, exp } : data;

    return new Promise((resolve, reject) => {
        if (!process.env.JWT_KEY) return reject('JWT_KEY is undefined!');

        jwt.sign(payload, process.env.JWT_KEY, {}, (error, token) => {
            if (error) reject(error);
            else resolve(token!);
        });
    });
};

export const verifyJwt = (token: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        if (!process.env.JWT_KEY) return reject('JWT_KEY is undefined!');

        jwt.verify(token, process.env.JWT_KEY, {}, error => resolve(!error));
    });
