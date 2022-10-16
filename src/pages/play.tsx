import React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';

const Test = styled.div`
    background: 'red';
`;

const Play: NextPage = () => {
    return Test.a;
};

export default Play;
