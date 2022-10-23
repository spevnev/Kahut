import { FunctionComponent, ReactElement, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt from 'jsonwebtoken';
import User from '../types/user';
import React from 'react';
import { deleteCookie, setCookie } from '../utils/cookies';

type Props = {
    children: ReactElement;
    user?: User;
};

const GoogleAuthProvider: FunctionComponent<Props> = ({ children, user: _user }) => {
    const [user, setUser] = useState(_user);

    const login = () => {
        if (user) return;

        const container = document.getElementById('google-auth-button-container');
        if (!container) throw new Error('Authentication error!');

        const el = container.children[0].children[0].children[0].children[0] as HTMLElement;
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
            {React.Children.map(children, child => React.cloneElement(child, { user, auth: { user, login, logout, setUser } }))}

            <div style={{ display: 'none' }} id="google-auth-button-container">
                <GoogleLogin onSuccess={onSuccess} state_cookie_domain="single_host_origin" />
            </div>
        </GoogleOAuthProvider>
    );
};

export type AuthProps = {
    user?: User;
    auth: {
        user?: User;
        login: () => void;
        logout: () => void;
        setUser: (user: User) => void;
    };
};

export default GoogleAuthProvider;
