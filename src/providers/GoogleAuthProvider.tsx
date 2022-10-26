import { createContext, FunctionComponent, ReactElement, useRef, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt from 'jsonwebtoken';
import User from '../types/user';
import { deleteCookie, setCookie } from '../utils/cookies';

type AuthContextData = {
    user?: User;
    login: () => void;
    logout: () => void;
    setUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextData>({ login: () => {}, logout: () => {}, setUser: () => {} });

type Props = {
    children: ReactElement;
    user?: User;
};

const GoogleAuthProvider: FunctionComponent<Props> = ({ children, user: _user }) => {
    const [user, setUser] = useState(_user);
    const loginRef = useRef<any>();

    const login = () => {
        if (user || !loginRef.current) return;

        const el = (loginRef.current as HTMLElement).children[0].children[0].children[0].children[0] as HTMLElement;
        if (!el) throw new Error('Authentication error!');

        el.click();
    };

    const onSuccess = async (obj: any) => {
        const res = await fetch(`${location.origin}/api/authenticate?token=${obj.credential}`);
        const { token } = await res.json();
        if (!token) throw new Error('No token!');

        setCookie('token', token);
        setUser(jwt.decode(token) as User);
    };

    const logout = () => {
        if (!user) return;

        deleteCookie('token');
        setUser(undefined);
    };

    return (
        <GoogleOAuthProvider clientId="292475380059-dqvd5h3kthcn8gibomg1ak4vhhjv6mca.apps.googleusercontent.com">
            <AuthContext.Provider value={{ user, login, logout, setUser }}>{children}</AuthContext.Provider>

            <div style={{ display: 'none' }} ref={loginRef}>
                <GoogleLogin onSuccess={onSuccess} state_cookie_domain="single_host_origin" />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthProvider;
