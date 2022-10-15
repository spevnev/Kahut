import React from 'react';
import { NextPage } from 'next';
import Form, { FormOnSubmitCallback } from '../components/login/Form';

const Login: NextPage = () => {
    const onSubmit: FormOnSubmitCallback = (inputs, showError) => {
        if (inputs['username'].length < 4) return showError("Username can't be shorter than 4!");
        if (inputs['username'].length > 30) return showError("Username can't be longer than 30!");
        if (inputs['password'].length < 4) return showError("Password can't be shorter than 4!");
        if (inputs['password'].length > 30) return showError("Password can't be longer than 30!");

        // TODO
    };

    return (
        <Form
            title="Log in"
            subtitle="Don't have an account yet?"
            link={{ text: 'Sign up', href: '/signup' }}
            onSubmit={onSubmit}
            inputs={[{ text: 'username' }, { text: 'password', isSecret: true }]}
        />
    );
};

export default Login;
