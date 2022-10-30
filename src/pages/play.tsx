import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import StyledInput from '../components/BoxInput';
import styled from 'styled-components';
import Header from '../components/Header';
import { color } from '../styles/theme';
import { AuthContext } from '../providers/GoogleAuthProvider';
import { gql, useMutation } from '@apollo/client';
import StyledButton from '../components/Button';
import { setCookie } from '../utils/cookies';
import jwt from 'jsonwebtoken';
import GameToken from '../types/gameToken';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: 600;
    font-style: italic;
    color: ${color('white0')};
    margin-bottom: 10px;
`;

const Input = styled(StyledInput)`
    margin: 3px 0;
    width: 30vw;
    background: ${color('black3')};
    padding: 6px 16px;
    font-size: 18px;
    text-align: center;
`;

const ErrorMessage = styled.p`
    font-size: 14px;
    color: ${color('red')};
`;

const Button = styled(StyledButton)`
    width: 20vw;
    margin: 10px 0;
`;

const JOIN_LOBBY = gql`
    mutation joinLobby($username: String!, $code: String!, $picture: String) {
        joinLobby(username: $username, code: $code, picture: $picture)
    }
`;

const Play: NextPage = () => {
    const [joinLobby] = useMutation(JOIN_LOBBY);
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [code, setCode] = useState(router.query.code || '');
    const [username, setUsername] = useState(user?.name || '');
    const [errorMessage, setErrorMessage] = useState('');
    const timeout = useRef<NodeJS.Timeout>();

    const showError = (msg: string) => {
        setErrorMessage(msg);

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setErrorMessage(''), 3000);
    };

    useEffect(() => () => timeout.current && clearTimeout(timeout.current), []);

    const joinGame = async () => {
        if (code.length !== 6) return;
        if (username.length < 1) return showError("Username can't be empty!");
        if (username.length > 30) return showError("Username can't be longer than 30!");

        const { data } = await joinLobby({ variables: { username, code, picture: user?.picture } });

        const { joinLobby: token } = data;
        if (!token) return showError('Duplicate username!');

        const { exp } = jwt.decode(token) as GameToken;
        setCookie('game_token', token, new Date(exp * 1000).toUTCString());
        router.push(`/lobby/${code}`);
    };

    return (
        <Container>
            <Header />
            <Title>Kahut!</Title>
            <Input placeholder="Username" value={username} onChange={(e: ChangeEvent) => setUsername((e.target as HTMLInputElement).value)} maxLength={30} />
            <Input placeholder="Code" value={code} onChange={(e: ChangeEvent) => setCode((e.target as HTMLInputElement).value.toUpperCase())} maxLength={6} />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Button onClick={joinGame}>Join</Button>
        </Container>
    );
};

export default Play;
