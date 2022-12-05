import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import ErrorPage from '../components/ErrorPage';

const ServerError: NextPage = () => <ErrorPage title="Error 500" subtitle="Error 500: Server error. Something went wrong! Try again later." />;

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default ServerError;
