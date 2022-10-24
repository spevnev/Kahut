import { ChangeEvent, useContext, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { color } from '../styles/theme';
import { isBrowser } from '../utils/helper';
import Header from '../components/Header';
import useDebounce from '../hooks/useDebounce';
import StyledInput from '../components/Input';
import { AuthContext } from '../providers/GoogleAuthProvider';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 10px;
`;

const UserData = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: fit-content;
    margin: 20px 0;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.p`
    font-size: 14px;
    font-weight: 300;
    color: ${color('white1')};
    width: 100%;
`;

const Icon = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    margin-right: 15px;
`;

const Input = styled(StyledInput)`
    width: 30vw;
`;

const Profile: NextPage = () => {
    const router = useRouter();
    const { user, setUser } = useContext(AuthContext);
    const [username, setUsername] = useState(user?.username);

    const debounce = useDebounce(
        async (username: string) => {
            if (!user) return;

            // TODO: submit changes to the server + update token
            // const req = await ;
            // const {token} = await req.json();
            // if (!token) return;
            // setCookie('token', token);

            setUser({ ...user, username });
        },
        (_, cur) => {
            setUsername(cur);
            return cur;
        },
        500
    );

    if (isBrowser() && !user) router.push('/');

    return (
        <Container>
            <Header />

            <UserData>
                <Icon src={user?.avatar} />

                <Inputs>
                    <Label>Username</Label>
                    <Input placeholder="Username" value={username} onChange={(e: ChangeEvent) => debounce((e.target as HTMLInputElement).value)} />
                    <Label>Email</Label>
                    <Input disabled={true} value={user?.email} onChange={() => {}} />
                </Inputs>
            </UserData>
        </Container>
    );
};

export default Profile;
