import jwt from 'jsonwebtoken';
import { isBrowser } from './helper';

export const login = () => {
    const container = document.getElementById('google-auth-button-container');
    if (!container) throw new Error('Authentication error!');

    const el = container.children[0].children[0].children[0].children[0] as HTMLElement;
    if (!el) throw new Error('Authentication error!');

    el.click();
};

export const getTokenData = (): any => {
    if (!isBrowser()) return null;

    const token: string | null = document.cookie.split('; ').filter(cur => cur.split('=')[0] === 'token')[0];
    return token ? jwt.decode(token) : null;
};

export const isAuthenticated = (): boolean => !!getTokenData();
