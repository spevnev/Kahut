export const isBrowser = (): boolean => typeof window !== 'undefined';

export const limitStringTo = (str: string, num: number): string => str.slice(0, num) + (str.length > num ? '...' : '');
