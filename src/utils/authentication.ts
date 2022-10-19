import { googleLogout } from '@react-oauth/google';

export const login = () => {
    const container = document.getElementById('google-auth-button-container');
    if (!container) throw new Error('Authentication error!');

    const el = container.children[0].children[0].children[0].children[0] as HTMLElement;
    if (!el) throw new Error('Authentication error!');

    el.click();
};

export const logout = googleLogout;
