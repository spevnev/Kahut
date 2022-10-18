import React from 'react';
import { NextPage } from 'next';
import ErrorPage from '../components/ErrorPage';

const PageNotFound: NextPage = () => <ErrorPage title="Error 404" subtitle="Error 404: Page not found. The page you was looking for doesn't exist!" />;

export default PageNotFound;
