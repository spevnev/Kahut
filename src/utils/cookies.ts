import { isBrowser } from './helper';

export const getCookie = (key: string): any => {
    if (!isBrowser()) return null;

    const cookies = document.cookie.split('; ');
    const matching = cookies.filter(cookie => cookie.split('=')[0] === key);
    if (matching.length !== 1) return null;

    return matching[0].slice(key.length + 1);
};

const NEXT_YEAR_UTC = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();

export const setCookie = (key: string, value: any, exp?: string) => (document.cookie = `${key}=${value};path=/;expires=${exp || NEXT_YEAR_UTC}`);

export const deleteCookie = (key: string) => (document.cookie = `${key}=;max-age=-1;`);
