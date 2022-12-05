import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AuthContext } from '../../providers/GoogleAuthProvider';
import { color } from '../../styles/theme';
import StyledInput from '../BoxInput';
import Button from '../Button';

const Container = styled.div`
    width: 27.5vw;
    min-width: 200px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${color('black2')};
    border-radius: 10px;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    padding: 20px 0;
`;

const Text = styled.h4`
    margin: 4px 0;
    font-size: 16px;
    color: ${color('white2')};
`;

const Br = styled.div`
    width: 90%;
    min-height: 1px;
    margin: 5px 0;
    background: ${color('white0')};
`;

const Input = styled(StyledInput)`
    width: 80%;
    font-size: 16px;
`;

const InfoCard: FunctionComponent = () => {
    const { user, login } = useContext(AuthContext);
    const [code, setCode] = useState('');
    const router = useRouter();

    const onChange = (event: ChangeEvent) => {
        const code = (event.target as HTMLInputElement).value.toUpperCase();
        if (code.length === 6) router.push(`/play?code=${code}`);

        setCode(code);
    };

    if (user) return null;

    return (
        <Container>
            <Button style={{ width: '80%' }} onClick={login}>
                Log in{' '}
            </Button>
            <Text>to get access to all features</Text>
            <Br />
            <Text>or play without an account</Text>
            <Input placeholder="Code" onChange={onChange} value={code} />
        </Container>
    );
};

export default InfoCard;
