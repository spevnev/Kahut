const theme: { [key: string]: string } = {
    black0: '#2E3440',
    black1: '#3B4252',
    black2: '#434C5E',
    black3: '#4C566A',

    gray: '#8C9097',

    white0: '#ECEFF4',
    white1: '#E5E9F0',
    white2: '#D8DEE9',

    frost0: '#2589FF',
    frost1: '#317EDE',
    frost2: '#2D72C7',
    frost3: '#2661AB',

    red: '#CD5F68',
    orange: '#CF896D',
    yellow: '#E6C687',
    green: '#9DC787',
    purple: '#AB5B9F',
};

export const color = (color: string) => {
    if (!theme[color]) throw new Error('Unknown color!');
    return (): string => theme[color];
};

export default theme;
