import { isBrowser } from './helper';

export const getCookie = (key: string): any => {
    if (!isBrowser()) return null;

    const cookies = document.cookie.split('; ');
    const matching = cookies.filter(cur => cur.split('=')[0] === key);
    if (matching.length !== 1) return null;

    return matching[0].slice(key.length + 1);
};

export const setCookie = (key: string, value: any) => (document.cookie = `${key}=${value};`);

export const deleteCookie = (key: string) => (document.cookie = `${key}=;max-age=0;`);
