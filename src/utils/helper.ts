export const isBrowser = (): boolean => typeof window !== 'undefined';

export const limitStringTo = (string: string, maxLength: number): string => string.slice(0, maxLength) + (string.length > maxLength ? '...' : '');

export const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

export const voidFunction = (): void => undefined;
