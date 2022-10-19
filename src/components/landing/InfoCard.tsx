import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { color } from '../../utils/globalStyles';
import { login } from '../../utils/authentication';

const Container = styled.div`
    width: 27.5vw;
    height: 22.5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${color('black2')};
    border-radius: 10px;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    padding: 20px 0;
`;

const Button = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${color('frost1')};
    transition: background-color 0.2s;
    cursor: pointer;
    border-radius: 3px;
    padding: 5px;

    &:hover {
        background: ${color('frost0')};
    }

    & a {
        color: ${color('white0')};
        text-decoration: none;
        font-size: 24px;
        font-weight: 200;
    }
`;

const Text = styled.h4`
    margin: 4px 0;
    font-size: 16px;
    color: ${color('white2')};
`;

const Br = styled.div`
    width: 80%;
    height: 1px;
    margin: 5px 0;
    background: ${color('white0')};
`;

const Input = styled.input`
    width: 80%;
    outline: none;
    border: none;
    border-radius: 5px;
    background: ${color('black1')};
    padding: 6px 10px;
    color: ${color('white1')};
    font-size: 16px;
    box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.2);
`;

const InfoCard: FunctionComponent = () => {
    const [code, setCode] = useState('');

    const onChange = (e: ChangeEvent) => {
        const code = (e.target as HTMLInputElement).value;
        if (code.length === 6) alert('Move to game with input filled-in');

        setCode(code);
    };

    return (
        <Container>
            <Button onClick={login}>Log in</Button>
            <Text>to get access to all features</Text>
            <Br />
            <Text>or play without an account</Text>
            <Input placeholder="Code" onChange={onChange} value={code} />
        </Container>
    );
};

export default InfoCard;