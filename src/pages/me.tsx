import { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { color } from '../styles/theme';
import User from '../types/user';
import { isBrowser } from '../utils/helper';
import Header from '../components/Header';
import useDebounce from '../hooks/useDebounce';
import StyledInput from '../components/Input';

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

type Props = {
    user?: User;
};

const Profile: NextPage<Props> = ({ user: _user }) => {
    const router = useRouter();
    const [user, setUser] = useState(_user);
    const [username, setUsername] = useState(_user?.username);

    const debounce = useDebounce(
        (username: string) => {
            // TODO: submit changes to the server
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
            <Header user={user} />

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
