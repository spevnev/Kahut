import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { color } from '../utils/globalStyles';
import User from '../utils/user';
import { isBrowser } from '../utils/helper';
import Header from '../components/Header';
import useDebounce from '../hooks/useDebounce';
import { setCookie } from '../utils/cookies';

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

const Input = styled.input`
    background: ${color('black0')};
    outline: none;
    border: none;
    border-radius: 3px;
    padding: 4px 12px;
    font-size: 16px;
    box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.3);
    color: ${color('white0')};
    width: 30vw;
    margin-bottom: 5px;

    &::placeholder {
        color: ${color('white2')};
    }
`;

type Props = {
    user: User;
};

const Profile: NextPage<Props> = ({ user: _user }) => {
    const router = useRouter();
    const [user, setUser] = useState(_user);
    const [username, setUsername] = useState(_user?.username);

    const callback = (username: string) => {
        // TODO: submit changes to the server
    };

    const debounce = useDebounce(callback, (_, cur) => cur, 500);

    const onChange = (e: ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value;
        setUsername(value);
        debounce(value);
    };

    if (isBrowser() && !user) router.push('/');

    return (
        <Container>
            <Header user={user} />

            <UserData>
                <Icon src={user.avatar} />

                <Inputs>
                    <Label>Username</Label>
                    <Input placeholder="Username" value={username} onChange={onChange} />
                    <Label>Email</Label>
                    <Input disabled={true} value={user.email} onChange={() => {}} />
                </Inputs>
            </UserData>
        </Container>
    );
};

export default Profile;
