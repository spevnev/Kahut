import styled from 'styled-components';
import { color } from '../../utils/globalStyles';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import closedEyeIcon from '../../../public/icons/closedEye.svg';
import openedEyeIcon from '../../../public/icons/openedEye.svg';
import goBackIcon from '../../../public/icons/goBack.svg';

const Quit = styled.img`
    position: absolute;
    top: 15px;
    left: 15px;
    cursor: pointer;
    transition: all 0.2s;
    transform: translateX(1px);

    &:hover {
        transform: translateX(-1px);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    max-width: 1280px;
    min-width: 400px;
    height: 75vh;
    padding-top: 10vh;
    margin: 0 auto;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: 100;
    color: ${color('white0')};
`;

const SubTitle = styled.h2`
    font-size: 18px;
    font-weight: 200;
    color: ${color('white1')};
`;

const TextLink = styled.div`
    display: inline;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    text-decoration: underline;
    color: ${color('frost4')};
`;

const Input = styled.input`
    width: 100%;
    background: ${color('black0')};
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 6px 10px;
    font-size: 16px;
    color: ${color('white2')};
    box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.3);
    margin: 4px 0;

    &::placeholder {
        color: ${color('gray')};
    }
`;

const Button = styled.button`
    margin-top: 4px;
    padding: 4px 16px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    background: ${color('frost1')};
    color: ${color('white1')};

    &:hover {
        background: ${color('frost0')};
    }
`;

const ImageButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    margin: auto 0 auto 8px;

    & img {
        width: 16px;
        height: 16px;
    }
`;

const ErrorMessage = styled.p`
    font-size: 16px;
    color: ${color('red')};
`;

export type FormOnSubmitCallback = (inputs: { [key: string]: string }, showError: (message: string) => void) => void;

type Props = {
    inputs: { key?: string; text: string; isSecret?: boolean }[];
    onSubmit: FormOnSubmitCallback;
    title: string;
    subtitle: string;
    link: { href: string; text: string };
};

const ERROR_DURATION = 3000;

const Form = ({ title, subtitle, link: { href, text: linkText }, inputs, onSubmit }: Props) => {
    const router = useRouter();
    const [visible, setVisible] = useState<{ [key: string]: boolean }>({});
    const [values, setValues] = useState<{ [key: string]: string }>(inputs.reduce((obj, val) => ({ ...obj, [val.key || val.text]: '' }), {}));
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const timeout = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => () => void (timeout.current && clearTimeout(timeout.current)), []);

    const showError = (message: string) => {
        setErrorMessage(message);

        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setErrorMessage(null);
            timeout.current = undefined;
        }, ERROR_DURATION);
    };

    return (
        <>
            <Quit src={goBackIcon.src} onClick={() => router.push('/')} />
            <Container>
                <Column>
                    <Title>{title}</Title>
                    <SubTitle>
                        {subtitle} <TextLink onClick={() => router.push(href)}>{linkText}</TextLink>
                    </SubTitle>
                </Column>
                <Column>
                    {inputs.map(({ key, text, isSecret }) => {
                        key = key || text;

                        return (
                            <Row key={key}>
                                <Input
                                    type={isSecret && !visible[key] ? 'password' : 'text'}
                                    placeholder={text.slice(0, 1).toUpperCase() + text.slice(1)}
                                    value={values[key]}
                                    onInput={e => setValues({ ...values, [key!]: (e.target as HTMLInputElement).value })}
                                />
                                {isSecret && (
                                    <ImageButton onClick={() => setVisible({ ...visible, [key!]: !visible[key!] })}>
                                        <img src={visible[key] ? closedEyeIcon.src : openedEyeIcon.src} />
                                    </ImageButton>
                                )}
                            </Row>
                        );
                    })}

                    <ErrorMessage style={errorMessage ? {} : { opacity: 0 }}>{errorMessage || '.'}</ErrorMessage>
                    <Button onClick={() => onSubmit(values, showError)}>Sign up</Button>
                </Column>
            </Container>
        </>
    );
};

export default Form;
