import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const onSuccess = async (obj: any) => {
    const res = await fetch(`${location.origin}/api/authenticate?token=${obj.credential}`);
    console.log(await res.json());
    // TODO: save jwt token in cookies
};

type Props = {
    children: JSX.Element;
};

const LoginProvider = ({ children }: Props) => (
    <GoogleOAuthProvider clientId="292475380059-dqvd5h3kthcn8gibomg1ak4vhhjv6mca.apps.googleusercontent.com">
        {children}
        <div style={{ display: 'none' }} id="google-auth-button-container">
            <GoogleLogin onSuccess={onSuccess} />
        </div>
    </GoogleOAuthProvider>
);

export default LoginProvider;
