import jwt from 'jsonwebtoken';

export const createJwt = (data: any, expiresIn?: number): Promise<string> => {
    const exp = Math.floor(Date.now() / 1000) + (expiresIn || 0);
    const payload = expiresIn ? { ...data, exp } : data;

    return new Promise((res, rej) => {
        if (!process.env.JWT_KEY) return rej('JWT_KEY is undefined!');

        jwt.sign(payload, process.env.JWT_KEY, {}, (err, token) => {
            if (err) rej(err);
            else res(token!);
        });
    });
};

export const verifyJwt = (token: string): Promise<boolean> => {
    return new Promise((res, rej) => {
        if (!process.env.JWT_KEY) return rej('JWT_KEY is undefined!');

        jwt.verify(token, process.env.JWT_KEY, {}, (err, data) => res(!err));
    });
};
