import React from 'react';
import { NextPage } from 'next';
import ErrorPage from '../components/ErrorPage';

const ServerError: NextPage = () => <ErrorPage title="Error 500" subtitle="Error 500: Server error. Something went wrong! Try again later." />;

export default ServerError;
