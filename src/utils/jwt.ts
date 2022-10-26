import jwt from 'jsonwebtoken';

export const createJwt = (data: any): Promise<string> => {
    return new Promise((res, rej) => {
        if (!process.env.JWT_KEY) return rej('JWT_KEY is undefined!');

        jwt.sign(data, process.env.JWT_KEY, {}, (err, token) => {
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
