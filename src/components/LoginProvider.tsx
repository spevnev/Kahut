import React, { FunctionComponent, ReactNode } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const onSuccess = async (obj: any) => {
    const res = await fetch(`${location.origin}/api/authenticate?token=${obj.credential}`);
    const json = await res.json();

    if (!json.token) throw new Error('No token!');
    document.cookie = `token=${json.token}`;
};

type Props = {
    children: ReactNode;
};

const LoginProvider: FunctionComponent<Props> = ({ children }) => (
    <GoogleOAuthProvider clientId="292475380059-dqvd5h3kthcn8gibomg1ak4vhhjv6mca.apps.googleusercontent.com">
        {children}
        <div style={{ display: 'none' }} id="google-auth-button-container">
            <GoogleLogin onSuccess={onSuccess} state_cookie_domain="single_host_origin" />
        </div>
    </GoogleOAuthProvider>
);

export default LoginProvider;
