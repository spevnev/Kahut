export const getCookie = (cookie: string): any => {
    const cookies = document.cookie.split('; ');
    const matching = cookies.filter(cur => cur.split('=')[0] === cookie);
    if (matching.length !== 1) return null;

    return matching[0].slice(cookie.length + 1);
};

export const setCookie = (key: string, value: any) => (document.cookie = `${key}=${value}`);
